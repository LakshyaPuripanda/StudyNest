import express from "express";
import fs from "fs"; 
import upload from "../utils/multer.js";
import { uploadMedia } from "../utils/cloudinary.js";

const router = express.Router();

router.post("/upload-video", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;

    // Use your helper function (uploadMedia)
    const result = await uploadMedia(filePath);

    // Delete local file after upload
    fs.unlinkSync(filePath);

    res.status(200).json({
      success: true,
      message: "File uploaded successfully.",
      data: result, // contains secure_url, public_id, etc.
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Error uploading file" });
  }
});

export default router;
