import * as z from 'zod';

// Course Editor Schemas
export const courseSchema = z.object({
  courseTitle: z.string().min(1, 'Title is required'),
  courseDescription: z.string().min(1, 'Description is required'),
  courseCategory: z.string().min(1, 'Category is required'),
  coursePrice: z.string(),
  courseStatus: z.boolean(),
  courseImage: z.string().url().optional().or(z.literal('')),
});

export type CourseFormData = z.infer<typeof courseSchema>;

// Chapter Schemas
export const chapterSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  video: z.union([z.string(), z.instanceof(File)]).optional(),
  quizzes: z
    .array(
      z.object({
        id: z.string().min(1, 'Quiz ID is required'),
        question: z.string().min(2, 'Question must be at least 2 characters'),
        // Add options, array of object that has {id, value}
        options: z
          .array(
            z.object({
              id: z.string().min(1, 'Option ID is required'),
              value: z.string().min(1, 'Option value is required'),
            })
          )
          .min(2, 'At least 2 options are required'),
        correctAnswer: z.string().min(1, 'Correct answer is required'),
      })
    )
    .optional()
    .default([]),
});

export type ChapterFormData = z.infer<typeof chapterSchema>;

// Section Schemas
export const sectionSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  duration: z.string().optional(),
  objectives: z.string().optional(),
});

export type SectionFormData = z.infer<typeof sectionSchema>;

// Guest Checkout Schema
export const guestSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type GuestFormData = z.infer<typeof guestSchema>;

// Notification Settings Schema
export const notificationSettingsSchema = z.object({
  courseNotifications: z.boolean(),
  emailAlerts: z.boolean(),
  smsAlerts: z.boolean(),
  notificationFrequency: z.enum(['immediate', 'daily', 'weekly']),
});

export type NotificationSettingsFormData = z.infer<
  typeof notificationSettingsSchema
>;
