import multer from "multer";
import path from "path";

// Store uploaded files temporarily in "uploads/" before sending to Cloudinary
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // temp folder
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname)); 
    // Example: 1694598871234-123456789.mp4
  }
});

const upload = multer({ storage });

export default upload;
