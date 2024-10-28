"use server";

import { cld } from "@/utilities/cloudinaryClient";
import pool from "@/utilities/dbConnection"; // Import the PostgreSQL client
import { currentUser } from "@clerk/nextjs";
import { uploadFile } from "./uploadFile";
import { checkPostForTrends } from "@/utilities/queryCache";
import { getAllFollowersAndFollowings } from "./user";

export const createPost = async (post) => {
  const { postText, media } = post;
  try {
    let cld_id;
    let assetUrl;
    const user = await currentUser();
    if (media) {
      const res = await uploadFile(media, `/posts/${user?.id}`);
      const { public_id, secure_url } = res;
      cld_id = public_id;
      assetUrl = secure_url;
    }
    const query =
      "INSERT INTO posts (postText, media, cld_id, authorId) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [postText, assetUrl, cld_id, user?.id];
    const { rows: newPost } = await pool.query(query, values);

    const trends = checkPostForTrends(postText);
    if (trends.length > 0) {
      await createTrends(trends, newPost[0].id);
    }

    return { data: newPost[0] };
  } catch (e) {
    console.log(e);
  }
};

export const getPosts = async (lastCursor, id) => {
  try {
    const take = 5;
    const whereClause = id !== "all" ? "WHERE authorId = $1" : "";
    const values = id !== "all" ? [id] : [];
    const query = `
      SELECT p.*, a.*, l.*, c.*, ca.*
      FROM posts p
      LEFT JOIN authors a ON p.authorId = a.id
      LEFT JOIN likes l ON p.id = l.postId
      LEFT JOIN comments c ON p.id = c.postId
      LEFT JOIN authors ca ON c.authorId = ca.id
      ${whereClause}
      ORDER BY p.createdAt DESC
      LIMIT $2 OFFSET $3
    `;
    const { rows: posts } = await pool.query(query, [
      ...values,
      take,
      lastCursor || 0,
    ]);

    if (posts.length === 0) {
      return { data: [], metaData: { lastCursor: null, hasMore: false } };
    }

    const lastPostInResults = posts[posts.length - 1];
    const cursor = lastPostInResults?.id;

    const morePostsQuery = `
      SELECT id
      FROM posts
      ${whereClause}
      ORDER BY createdAt DESC
      LIMIT $1 OFFSET $2
    `;
    const { rows: morePosts } = await pool.query(morePostsQuery, [
      ...values,
      take,
      cursor || 0,
    ]);

    return {
      data: posts,
      metaData: { lastCursor: cursor, hasMore: morePosts.length > 0 },
    };
  } catch (e) {
    console.log(e);
  }
};

export const getMyPostsFeed = async (lastCursor) => {
  try {
    const { id } = await currentUser();
    const { followers, following } = await getAllFollowersAndFollowings(id);
    const followingIds = following.map((f) => f.followingId);
    const followerIds = followers.map((f) => f.followerId);

    // Combine the lists and include your own id
    const userIds = [...new Set([...followingIds, ...followerIds, id])];

    const take = 5;
    const query = `
      SELECT p.*, a.*, l.*, c.*, ca.*
      FROM posts p
      LEFT JOIN authors a ON p.authorId = a.id
      LEFT JOIN likes l ON p.id = l.postId
      LEFT JOIN comments c ON p.id = c.postId
      LEFT JOIN authors ca ON c.authorId = ca.id
      WHERE p.authorId = ANY($1)
      ORDER BY p.createdAt DESC
      LIMIT $2 OFFSET $3
    `;
    const { rows: posts } = await pool.query(query, [
      userIds,
      take,
      lastCursor || 0,
    ]);

    if (posts.length === 0) {
      return { data: [], metaData: { lastCursor: null, hasMore: false } };
    }

    const lastPostInResults = posts[posts.length - 1];
    const cursor = lastPostInResults?.id;

    const morePostsQuery = `
      SELECT id
      FROM posts
      WHERE authorId = ANY($1)
      ORDER BY createdAt DESC
      LIMIT $2 OFFSET $3
    `;
    const { rows: morePosts } = await pool.query(morePostsQuery, [
      userIds,
      take,
      cursor || 0,
    ]);

    return {
      data: posts,
      metaData: { lastCursor: cursor, hasMore: morePosts.length > 0 },
    };
  } catch (e) {
    console.log(e);
  }
};

export const updatePostLike = async (postId, type) => {
  try {
    const { id: userId } = await currentUser();

    const postQuery = `
      SELECT p.*, l.*
      FROM posts p
      LEFT JOIN likes l ON p.id = l.postId
      WHERE p.id = $1
    `;
    const { rows: post } = await pool.query(postQuery, [postId]);

    if (!post.length) {
      return { error: "Post not found" };
    }

    const like = post[0].likes.find((like) => like.authorId === userId);

    if (like) {
      if (type === "like") {
        return { data: post[0] };
      } else {
        const deleteLikeQuery = "DELETE FROM likes WHERE id = $1";
        await pool.query(deleteLikeQuery, [like.id]);
        console.log("like deleted");
      }
    } else {
      if (type === "unlike") {
        return { data: post[0] };
      } else {
        const insertLikeQuery =
          "INSERT INTO likes (postId, authorId) VALUES ($1, $2)";
        await pool.query(insertLikeQuery, [postId, userId]);
        console.log("like created");
      }
    }

    const updatedPostQuery = `
      SELECT p.*, l.*
      FROM posts p
      LEFT JOIN likes l ON p.id = l.postId
      WHERE p.id = $1
    `;
    const { rows: updatedPost } = await pool.query(updatedPostQuery, [postId]);

    console.log("updated post", updatedPost[0]);
    return { data: updatedPost[0] };
  } catch (e) {
    console.log(e);
  }
};

export const addComment = async (postId, comment) => {
  try {
    const { id: userId } = await currentUser();
    const query =
      "INSERT INTO comments (comment, postId, authorId) VALUES ($1, $2, $3) RETURNING *";
    const values = [comment, postId, userId];
    const { rows: newComment } = await pool.query(query, values);

    console.log("comment created", newComment[0]);
    return { data: newComment[0] };
  } catch (e) {
    console.log(e);
  }
};

export const createTrends = async (trends, postId) => {
  try {
    const query =
      "INSERT INTO trends (name, postId) VALUES ($1, $2) RETURNING *";
    const values = trends.map((trend) => [trend, postId]);
    const { rows: newTrends } = await pool.query(query, values);

    return { data: newTrends };
  } catch (e) {
    console.log(e);
  }
};

export const getPopularTrends = async () => {
  try {
    const query = `
      SELECT name, COUNT(name) as count
      FROM trends
      GROUP BY name
      ORDER BY count DESC
      LIMIT 3
    `;
    const { rows: trends } = await pool.query(query);

    return { data: trends };
  } catch (e) {
    console.log(e);
  }
};

export const deletePost = async (postId) => {
  try {
    const { id: userId } = await currentUser();
    const postQuery = "SELECT * FROM posts WHERE id = $1";
    const { rows: post } = await pool.query(postQuery, [postId]);

    if (post[0].authorId !== userId) {
      return { error: "You are not authorized to delete this post" };
    }

    const deletePostQuery = "DELETE FROM posts WHERE id = $1";
    await pool.query(deletePostQuery, [postId]);

    return { data: "Post deleted" };
  } catch (e) {
    console.log(e);
  }
};
