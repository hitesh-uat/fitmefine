import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import {
  clerkMiddleware,
  createClerkClient,
  requireAuth,
} from '@clerk/express';

/* CONFIGURATION */
dotenv.config();

/* ROUTE IMPORTS */
import courseRoutes from './routes/courseRoutes';
import userClerkRoutes from './routes/userClerkRoutes';
import fileRoutes from './routes/fileRoutes';
import transactionRoutes from './routes/transactionRoutes';
import userCourseProgressRoutes from './routes/userCourseProgressRoutes';

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URL || 'mongodb://localhost:27017/lms';

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

export const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(clerkMiddleware());

/* ROUTES */
app.get('/status', (req, res) => {
  res.send('Hello Server');
});

app.use('/courses', courseRoutes);
app.use('/users/clerk', requireAuth(), userClerkRoutes);
app.use('/users/file', fileRoutes);
app.use('/transactions', requireAuth(), transactionRoutes);
app.use('/users/course-progress', requireAuth(), userCourseProgressRoutes);

/* SERVER SETUP */
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
