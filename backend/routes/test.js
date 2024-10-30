import express from 'express';
import multer from 'multer';
import cloudinary  from '../config/cloudinary.js';

const router = express.Router();
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

router.post('/test-upload', upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const uploadStream = cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
      if (error) {
        console.error('Upload Error:', error);
        return res.status(500).json({ message: 'Upload failed', error });
      }
      res.json(result); // Return the upload result
    });

    // Pipe the buffer to Cloudinary
    uploadStream.end(req.file.buffer); // Make sure to end the stream with the buffer

  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Upload failed', error });
  }
});

export const testRoutes = router;
