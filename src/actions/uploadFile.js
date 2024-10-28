"use server";
import { cld } from "@/utilities/cloudinaryClient";
import pool from "@/utilities/dbConnection"; // Import the PostgreSQL client

export const uploadFile = async (file, folder, userId) => {
  try {
    // Use the correct folder name
    const folderName = `your-correct-folder-name/${folder}`; // Replace 'your-correct-folder-name' with the actual folder name

    // Upload image to Cloudinary
    const res = await cld.v2.uploader.upload(file, {
      folder: folderName,
      resource_type: "auto",
    });

    if (res.error) {
      throw new Error(res.error.message);
    }

    console.log("file uploaded successfully to Cloudinary");

    // Store the URL in PostgreSQL
    const { secure_url: url, public_id } = res;
    const query =
      "INSERT INTO media (url, public_id, user_id) VALUES ($1, $2, $3)";
    const values = [url, public_id, userId];

    await pool.query(query, values);

    console.log("file URL stored successfully in PostgreSQL");
    return { url, public_id };
  } catch (e) {
    console.log(e);
    return {
      error: "Failed to upload and store URL",
    };
  }
};

export const deleteFile = async (public_id) => {
  try {
    // Delete image from Cloudinary
    const res = await cld.v2.uploader.destroy(public_id);

    if (res.error) {
      throw new Error(res.error.message);
    }

    console.log("file deleted successfully from Cloudinary");

    // Delete the URL from PostgreSQL
    const query = "DELETE FROM media WHERE public_id = $1";
    const values = [public_id];

    await pool.query(query, values);

    console.log("file URL deleted successfully from PostgreSQL");
    return res;
  } catch (e) {
    console.log(e);
    return {
      error: "Failed to delete",
    };
  }
};
