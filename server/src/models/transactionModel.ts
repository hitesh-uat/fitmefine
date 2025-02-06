import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  userId: string;
  transactionId: string;
  dateTime: Date;
  courseId: string;
  paymentProvider: 'stripe';
  amount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    userId: { type: String, required: true, index: true },
    transactionId: { type: String, required: true, unique: true },
    dateTime: { type: Date, required: true },
    courseId: { type: String, required: true, index: true },
    paymentProvider: {
      type: String,
      enum: ['stripe'],
      required: true,
    },
    amount: Number,
  },
  {
    timestamps: true,
  }
);

// Compound index for frequent query patterns
transactionSchema.index({ userId: 1, transactionId: 1 });
transactionSchema.index({ courseId: 1 });

const Transaction = mongoose.model<ITransaction>(
  'Transaction',
  transactionSchema
);
export default Transaction;
