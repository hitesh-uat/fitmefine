import mongoose, { Schema, Document, Model } from 'mongoose';

interface IComment extends Document {
  commentId: string;
  userId: string;
  text: string;
  timestamp: string;
}

interface IQuizOption extends Document {
  id: string;
  value: string;
}

interface IQuiz extends Document {
  id: string;
  question: string;
  options: IQuizOption[];
  correctAnswer: string;
}

interface IChapter extends Document {
  chapterId: string;
  type: 'Text' | 'Quiz' | 'Video';
  title: string;
  content: string;
  comments: IComment[];
  video?: string;
  quizzes: IQuiz[];
}

interface ISection extends Document {
  sectionId: string;
  sectionTitle: string;
  sectionDescription?: string;
  objectives?: string;
  duration?: number;
  chapters: IChapter[];
}

interface IEnrollment extends Document {
  userId: string;
}

interface ICourse extends Document {
  courseId: string;
  teacherId: string;
  teacherName: string;
  title: string;
  description?: string;
  category: string;
  image?: string;
  price?: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Draft' | 'Published';
  sections: ISection[];
  enrollments: IEnrollment[];
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>({
  commentId: { type: String, required: true },
  userId: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: String, required: true },
});

const quizOptionSchema = new Schema<IQuizOption>({
  id: { type: String, required: true },
  value: { type: String, required: true },
});

const quizSchema = new Schema<IQuiz>({
  id: { type: String, required: true },
  question: { type: String, required: true },
  options: { type: [quizOptionSchema], required: true },
  correctAnswer: { type: String, required: true },
});

const chapterSchema = new Schema<IChapter>({
  chapterId: { type: String, required: true },
  type: { type: String, enum: ['Text', 'Quiz', 'Video'], required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  comments: [commentSchema],
  video: { type: String },
  quizzes: { type: [quizSchema], default: [] },
});

const sectionSchema = new Schema<ISection>({
  sectionId: { type: String, required: true },
  sectionTitle: { type: String, required: true },
  sectionDescription: { type: String },
  objectives: { type: String },
  duration: { type: Number },
  chapters: [chapterSchema],
});

const enrollmentSchema = new Schema<IEnrollment>({
  userId: { type: String, required: true },
});

const courseSchema = new Schema<ICourse>(
  {
    courseId: { type: String, required: true, unique: true },
    teacherId: { type: String, required: true },
    teacherName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    image: { type: String },
    price: { type: Number },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true,
    },
    status: { type: String, enum: ['Draft', 'Published'], required: true },
    sections: [sectionSchema],
    enrollments: { type: [enrollmentSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

const Course: Model<ICourse> = mongoose.model<ICourse>('Course', courseSchema);
export default Course;
