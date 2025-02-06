import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Course from '../models/courseModel';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from '@clerk/express';

const s3 = new AWS.S3();

export const listCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { category, search } = req.query;
  const query: any = {};

  try {
    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    
    const courses = await Course.find(query).lean().exec();
    res.json({ message: 'Courses retrieved successfully', data: courses });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving courses',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getCourse = async (req: Request, res: Response): Promise<void> => {
  const { courseId } = req.params;
  try {
    const course = await Course.findOne({ courseId }).lean();
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    res.json({ message: 'Course retrieved successfully', data: course });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving course',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const createCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { teacherId, teacherName } = req.body;

    if (!teacherId || !teacherName) {
      res.status(400).json({ message: 'Teacher Id and name are required' });
      return;
    }

    const newCourse = new Course({
      courseId: uuidv4(),
      teacherId,
      teacherName,
      title: 'Untitled Course',
      description: '',
      category: 'Uncategorized',
      image: '',
      price: 0,
      level: 'Beginner',
      status: 'Draft',
      sections: [],
      enrollments: [],
    });

    await newCourse.save();
    res.json({
      message: 'Course created successfully',
      data: newCourse.toObject(),
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating course',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const updateCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { courseId } = req.params;
  const updateData = { ...req.body };
  const { userId } = getAuth(req);

  try {
    const course = await Course.findOne({ courseId });
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    if (course.teacherId !== userId) {
      res.status(403).json({ message: 'Not authorized to update this course' });
      return;
    }

    if (updateData.price) {
      const price = parseInt(updateData.price);
      if (isNaN(price)) {
        res.status(400).json({ message: 'Price must be a valid number' });
        return;
      }
      updateData.price = price * 100;
    }

    if (updateData.sections.length) {
      const sectionsData =
        typeof updateData.sections === 'string'
          ? JSON.parse(updateData.sections)
          : updateData.sections;

      updateData.sections = sectionsData.map((section: any) => ({
        ...section,
        sectionId: section.sectionId || uuidv4(),
        chapters: section.chapters.map((chapter: any) => ({
          ...chapter,
          chapterId: chapter.chapterId || uuidv4(),
        })),
      }));
    }

    const updatedCourse = await Course.findOneAndUpdate(
      { courseId },
      updateData,
      { new: true, runValidators: true }
    ).lean();

    res.json({ message: 'Course updated successfully', data: updatedCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error updating course',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { courseId } = req.params;
  const { userId } = getAuth(req);

  try {
    const course = await Course.findOne({ courseId });
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    if (course.teacherId !== userId) {
      res.status(403).json({ message: 'Not authorized to delete this course' });
      return;
    }

    await Course.deleteOne({ courseId });
    res.json({
      message: 'Course deleted successfully',
      data: course.toObject(),
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting course',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getUploadVideoUrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { fileName, fileType } = req.body;

  if (!fileName || !fileType) {
    res.status(400).json({ message: 'File name and type are required' });
    return;
  }

  try {
    const uniqueId = uuidv4();
    const s3Key = `videos/${uniqueId}/${fileName}`;

    const s3Params = {
      Bucket: process.env.S3_BUCKET_NAME || '',
      Key: s3Key,
      Expires: 60,
      ContentType: fileType,
    };

    const uploadUrl = s3.getSignedUrl('putObject', s3Params);
    const videoUrl = `${process.env.CLOUDFRONT_DOMAIN}/videos/${uniqueId}/${fileName}`;

    res.json({
      message: 'Upload URL generated successfully',
      data: { uploadUrl, videoUrl },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error generating upload URL',
      error: error instanceof Error ? error.message : error,
    });
  }
};
