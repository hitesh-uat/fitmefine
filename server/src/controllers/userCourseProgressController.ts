import { Request, Response } from 'express';
import { getAuth } from '@clerk/express';
import UserCourseProgress from '../models/userCourseProgressModel';
import Course from '../models/courseModel';
import { calculateOverallProgress } from '../utils/utils';
import { mergeSections } from '../utils/utils';

export const getUserEnrolledCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  const auth = getAuth(req);

  if (!auth || auth.userId !== userId) {
    res.status(403).json({ message: 'Access denied' });
    return;
  }

  try {
    // Get user's course progress documents
    const enrolledCourses = await UserCourseProgress.find({ userId });

    if (!enrolledCourses.length) {
      res.json({
        message: 'No enrolled courses found',
        data: [],
      });
      return;
    }

    // Extract course IDs and get course details
    const courseIds = enrolledCourses.map((item) => item.courseId);
    const courses = await Course.find({
      courseId: { $in: courseIds },
    }).lean();

    res.json({
      message: 'Enrolled courses retrieved successfully',
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving enrolled courses',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getUserCourseProgress = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, courseId } = req.params;

  try {
    const progress = await UserCourseProgress.findOne({
      userId,
      courseId,
    });

    if (!progress) {
      res.status(404).json({
        message: 'Course progress not found for this user',
      });
      return;
    }

    res.json({
      message: 'Course progress retrieved successfully',
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving user course progress',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const updateUserCourseProgress = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, courseId } = req.params;
  const progressData = req.body;

  try {
    // Find or create progress document
    let progress = await UserCourseProgress.findOne({ userId, courseId });

    if (!progress) {
      progress = new UserCourseProgress({
        userId,
        courseId,
        enrollmentDate: new Date(),
        overallProgress: 0,
        sections: progressData.sections || [],
        lastAccessedTimestamp: new Date(),
      });
    } else {
      progress.sections = mergeSections(
        progress.sections,
        progressData.sections || []
      );
      progress.lastAccessedTimestamp = new Date();
      progress.overallProgress = calculateOverallProgress(progress.sections);
    }

    // Save and return updated document
    const updatedProgress = await progress.save();

    res.json({
      message: 'Progress updated successfully',
      data: updatedProgress,
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({
      message: 'Error updating user course progress',
      error: error instanceof Error ? error.message : error,
    });
  }
};
