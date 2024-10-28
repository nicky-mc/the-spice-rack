import pool from "@/utilities/dbConnection"; // Import the PostgreSQL client
import { currentUser } from "@clerk/nextjs"; // Import the currentUser function from Clerk
import { uploadFile, deleteFile } from "@/actions/uploadFile"; // Import the uploadFile and deleteFile functions

export const createUser = async (user) => {
  const { id, first_name, last_name, email_address, image_url, username } =
    user;
  try {
    const userExistsQuery = "SELECT * FROM users WHERE id = $1";
    const { rows: userExists } = await pool.query(userExistsQuery, [id]);

    if (userExists.length) {
      await updateUser(user);
      return;
    }

    const query =
      "INSERT INTO users (id, first_name, last_name, email_address, image_url, username) VALUES ($1, $2, $3, $4, $5, $6)";
    const values = [
      id,
      first_name,
      last_name,
      email_address,
      image_url,
      username,
    ];
    await pool.query(query, values);

    console.log("New user created in db");
  } catch (e) {
    console.log(e);
    return { error: "Failed to save new user in db" };
  }
};

export const updateUser = async (user) => {
  const { id, first_name, last_name, email_address, image_url, username } =
    user;
  try {
    const query =
      "UPDATE users SET first_name = $1, last_name = $2, email_address = $3, image_url = $4, username = $5 WHERE id = $6";
    const values = [
      first_name,
      last_name,
      email_address,
      image_url,
      username,
      id,
    ];
    await pool.query(query, values);

    console.log("User updated in db");
  } catch (e) {
    console.log(e);
    return { error: "Failed to update user in db" };
  }
};

export const getUser = async (id) => {
  try {
    const query =
      "SELECT id, first_name, last_name, email_address, image_url, username, banner_url, banner_id FROM users WHERE id = $1";
    const { rows: user } = await pool.query(query, [id]);

    return { data: user[0] };
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = async (id) => {
  try {
    const query = "DELETE FROM users WHERE id = $1";
    await pool.query(query, [id]);

    console.log("User deleted in db");
  } catch (e) {
    console.log(e);
    return { error: "Failed to delete user in db" };
  }
};

export const updateBanner = async (params) => {
  const { id, banner, prevBannerId } = params;
  try {
    let banner_id;
    let banner_url;

    if (banner) {
      const res = await uploadFile(banner, `/users/${id}`);
      const { public_id, secure_url } = res;
      banner_id = public_id;
      banner_url = secure_url;

      // Delete previous banner
      if (prevBannerId) {
        await deleteFile(prevBannerId);
      }
    }

    const query =
      "UPDATE users SET banner_url = $1, banner_id = $2 WHERE id = $3";
    const values = [banner_url, banner_id, id];
    await pool.query(query, values);

    console.log("User banner updated");
  } catch (e) {
    console.log("Error updating user banner");
  }
};

export const updateFollow = async (params) => {
  const { id, type } = params;
  // type = follow or unfollow, id is target user id
  try {
    const loggedInUser = await currentUser();
    if (type === "follow") {
      const query =
        "INSERT INTO follow (follower_id, following_id) VALUES ($1, $2)";
      const values = [loggedInUser.id, id];
      await pool.query(query, values);

      console.log("User followed");
    } else if (type === "unfollow") {
      const query =
        "DELETE FROM follow WHERE follower_id = $1 AND following_id = $2";
      const values = [loggedInUser.id, id];
      await pool.query(query, values);

      console.log("User unfollowed");
    }
  } catch (e) {
    console.log(e);
  }
};

export const getAllFollowersAndFollowings = async (id) => {
  try {
    const followersQuery = "SELECT * FROM follow WHERE following_id = $1";
    const { rows: followers } = await pool.query(followersQuery, [id]);

    const followingQuery = "SELECT * FROM follow WHERE follower_id = $1";
    const { rows: following } = await pool.query(followingQuery, [id]);

    return { followers, following };
  } catch (e) {
    console.log(e);
  }
};

export const getFollowSuggestions = async () => {
  try {
    const loggedInUser = await currentUser();
    // Fetch all users that the given user is already following
    const followingQuery =
      "SELECT following_id FROM follow WHERE follower_id = $1";
    const { rows: following } = await pool.query(followingQuery, [
      loggedInUser?.id,
    ]);

    // Extract the IDs of the users that the given user is already following
    const followingIds = following.map((follow) => follow.following_id);

    // Fetch all users that the given user is not already following
    const suggestionsQuery = `
      SELECT * FROM users
      WHERE id != $1 AND id != ALL($2::uuid[])
    `;
    const { rows: suggestions } = await pool.query(suggestionsQuery, [
      loggedInUser?.id,
      followingIds,
    ]);

    return suggestions;
  } catch (e) {
    console.log(e);
  }
};
