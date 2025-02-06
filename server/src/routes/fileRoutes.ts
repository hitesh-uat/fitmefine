import express from 'express';
import multer from 'multer';

import { uploadFile } from '../controllers/fileController';
import { requireAuth } from '@clerk/express';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });
// router.get('/', getSignedUrl);
router.post('/upload', upload.any(), uploadFile);

export default router;
