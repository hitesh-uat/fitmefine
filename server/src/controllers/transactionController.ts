import Stripe from 'stripe';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Course from '../models/courseModel';
import Transaction from '../models/transactionModel';
import UserCourseProgress from '../models/userCourseProgressModel';

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    'STRIPE_SECRET_KEY is required but was not found in env variables'
  );
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const listTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.query;

  try {
    const query = userId ? { userId } : {};
    const transactions = await Transaction.find(query);

    res.json({
      message: 'Transactions retrieved successfully',
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving transactions',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const createStripePaymentIntent = async (
  req: Request,
  res: Response
): Promise<void> => {
  let { amount } = req.body;

  if (!amount || amount <= 0) {
    amount = 50;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Software development services',
      shipping: {
        address: {
          line1: '510 Townsend St',
          country: 'US',
        },
        name: 'John Doe',
      },
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });

    res.json({
      message: 'Payment intent created successfully',
      data: {
        clientSecret: paymentIntent.client_secret,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating stripe payment intent',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const createTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, courseId, transactionId, amount, paymentProvider } =
      req.body;

    // 1. Get course info
    const course = await Course.findOne({ courseId }).session(session);
    if (!course) {
      throw new Error('Course not found');
    }

    // 2. Create transaction record
    const newTransaction = new Transaction({
      dateTime: new Date(),
      userId,
      courseId,
      transactionId,
      amount,
      paymentProvider,
    });
    await newTransaction.save({ session });

    // 3. Create initial course progress
    const initialProgress = new UserCourseProgress({
      userId,
      courseId,
      enrollmentDate: new Date(),
      overallProgress: 0,
      sections: course.sections.map((section: any) => ({
        sectionId: section.sectionId,
        chapters: section.chapters.map((chapter: any) => ({
          chapterId: chapter.chapterId,
          completed: false,
        })),
      })),
      lastAccessedTimestamp: new Date(),
    });
    await initialProgress.save({ session });

    // 4. Add enrollment to relevant course
    await Course.updateOne(
      { courseId },
      { $push: { enrollments: { userId } } },
      { session }
    );

    await session.commitTransaction();

    res.json({
      message: 'Course purchased successfully',
      data: {
        transaction: newTransaction.toObject(),
        courseProgress: initialProgress.toObject(),
      },
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      message: 'Error creating transaction and enrollment',
      error: error instanceof Error ? error.message : error,
    });
  } finally {
    session.endSession();
  }
};
