// routes/resume.js
import express from 'express';
import multer from 'multer';
import { auth } from '../middleware/auth.js';
import Resume from '../models/Resume.js';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Upload resume (protected route)
router.post('/resume-upload', auth, upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Create new resume document
        const resume = new Resume({
            userId: req.user.userId,
            filename: req.file.filename,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size
        });

        await resume.save();

        res.json({
            message: 'Resume uploaded successfully!',
            resume: {
                id: resume._id,
                filename: resume.filename,
                originalname: resume.originalname,
                uploadDate: resume.uploadDate
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Upload failed' });
    }
});

// Get user's resumes (protected route)
router.get('/resumes', auth, async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user.userId })
            .sort({ uploadDate: -1 });
        res.json(resumes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch resumes' });
    }
});

export default router;
