import mongoose, { Schema, Document } from 'mongoose';

interface IChapterProgress extends Document {
  chapterId: string;
  completed: boolean;
}

const chapterProgressSchema = new Schema<IChapterProgress>({
  chapterId: { type: String, required: true },
  completed: { type: Boolean, required: true },
});

interface ISectionProgress extends Document {
  sectionId: string;
  chapters: IChapterProgress[];
}

const sectionProgressSchema = new Schema<ISectionProgress>({
  sectionId: { type: String, required: true },
  chapters: [chapterProgressSchema],
});

export interface IUserCourseProgress extends Document {
  userId: string;
  courseId: string;
  enrollmentDate: Date;
  overallProgress: number;
  sections: ISectionProgress[];
  lastAccessedTimestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userCourseProgressSchema = new Schema<IUserCourseProgress>(
  {
    userId: { type: String, required: true, index: true },
    courseId: { type: String, required: true, index: true },
    enrollmentDate: { type: Date, required: true },
    overallProgress: { type: Number, required: true, min: 0, max: 100 },
    sections: [sectionProgressSchema],
    lastAccessedTimestamp: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

// Compound unique index for user-course combination
userCourseProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const UserCourseProgress = mongoose.model<IUserCourseProgress>(
  'UserCourseProgress',
  userCourseProgressSchema
);
export default UserCourseProgress;
