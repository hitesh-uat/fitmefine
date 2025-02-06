'use client';

import { CustomFormField } from '@/components/CustomFormField';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { courseSchema } from '@/lib/schemas';
import {
  centsToDollars,
  createCourseFormData,
  uploadAllVideos,
} from '@/lib/utils';
import { openSectionModal, setSections } from '@/state';
import {
  useGetCourseQuery,
  useGetUploadVideoUrlMutation,
  useUpdateCourseMutation,
  useUploadFileMutation,
} from '@/state/api';
import { useAppDispatch, useAppSelector } from '@/state/redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ImageIcon, Loader2, Plus, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ChapterModal from './ChapterModal';
import DroppableComponent from './Droppable';
import SectionModal from './SectionModal';
import Image from 'next/image';

const CourseEditor = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: course, isLoading, refetch } = useGetCourseQuery(id);
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();
  const [getUploadVideoUrl] = useGetUploadVideoUrlMutation();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [uploadFile] = useUploadFileMutation();
  const { sections } = useAppSelector((state) => state.global.courseEditor);

  const methods = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseTitle: '',
      courseDescription: '',
      courseCategory: '',
      coursePrice: '0',
      courseStatus: false,
      courseLevel: 'beginner',
      courseImage: '',
    },
  });

  useEffect(() => {
    if (course) {
      methods.reset({
        courseTitle: course.title,
        courseDescription: course.description,
        courseCategory: course.category,
        coursePrice: centsToDollars(course.price),
        courseStatus: course.status === 'Published',
        courseLevel: course.level || 'beginner',
        courseImage: course.image || '',
      });
      setPreviewImage(course.image || null);
      dispatch(setSections(course.sections || []));
    }
  }, [course, methods, dispatch]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const result = await uploadFile(formData).unwrap();
      setPreviewImage(result.url);

      methods.setValue('courseImage', result.url);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    methods.setValue('courseImage', '');
  };

  const onSubmit = async (data: CourseFormData) => {
    try {
      const updatedSections = await uploadAllVideos(
        sections,
        id,
        getUploadVideoUrl
      );

      const formData = createCourseFormData(
        {
          ...data,
        },
        updatedSections
      );

      await updateCourse({
        courseId: id,
        formData,
      }).unwrap();

      refetch();
    } catch (error) {
      console.error('Failed to update program:', error);
    }
  };

  return (
    <div className='animate-fade-in bg-white-100'>
      <div className='flex items-center gap-5 mb-5'>
        <button
          className='flex items-center border border-primary-300 rounded-lg p-2 gap-2 cursor-pointer 
          hover:bg-primary-500 hover:text-white-100 text-primary-700 transition-all duration-300'
          onClick={() => router.push('/teacher/courses', { scroll: false })}
        >
          <ArrowLeft className='w-4 h-4' />
          <span>Back to programs</span>
        </button>
      </div>

      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Header
            title='Program Setup'
            subtitle='Complete all fields and save your program'
            className='mb-10'
            titleClassName='tracking-tight'
            subtitleClassName='text-primary-500/90'
            rightElement={
              <div className='flex items-center gap-4 bg-popover p-3 rounded-lg border border-border shadow-sm'>
                <CustomFormField
                  name='courseStatus'
                  label={methods.watch('courseStatus') ? 'Published' : 'Draft'}
                  type='switch'
                  className='flex items-center gap-2'
                  labelClassName={`text-sm font-medium ${
                    methods.watch('courseStatus')
                      ? 'text-success-500 bg-success-50 px-3 py-1 rounded-md'
                      : 'text-muted-foreground bg-muted px-3 py-1 rounded-md'
                  }`}
                  inputClassName='data-[state=checked]:bg-primary-500'
                />
                <Button
                  type='submit'
                  className='bg-primary-500 hover:bg-primary-600 text-primary-50 px-6 h-11 rounded-lg font-semibold shadow-sm transition-colors'
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <div className='flex items-center gap-2'>
                      <Loader2 className='h-4 w-4 animate-spin' />
                      <span>Saving...</span>
                    </div>
                  ) : methods.watch('courseStatus') ? (
                    'Update Program'
                  ) : (
                    'Save Draft'
                  )}
                </Button>
              </div>
            }
          />

          <div className='grid md:grid-cols-2 gap-6 mt-8 font-dm-sans'>
            {/* Left Column - Course Details */}
            <div className='space-y-6'>
              {/* Basic details */}
              <div className='bg-card p-6 rounded-xl shadow-sm border border-primary-100'>
                <h3 className='text-lg font-semibold text-primary-900 mb-4'>
                  Basic Information
                </h3>
                <div className='space-y-4'>
                  <CustomFormField
                    name='courseTitle'
                    label='Program Title'
                    type='text'
                    placeholder='Advanced Health Sciences'
                    className='border-primary-200 focus:ring-primary-500'
                    labelClassName='text-primary-900'
                  />
                  <CustomFormField
                    name='courseDescription'
                    label='Program Description'
                    type='desc'
                    placeholder='Describe your program...'
                    labelClassName='text-primary-900'
                  />
                </div>
              </div>

              {/* Image and Thumbnail Section */}
              <div className='bg-card p-6 rounded-xl shadow-sm border border-primary-100'>
                <h3 className='text-lg font-semibold text-primary-900 mb-4'>
                  Program Image
                </h3>
                <div className='relative group'>
                  <div
                    className={`border-2 border-dashed border-primary-200 rounded-xl 
                    ${
                      !previewImage ? 'min-h-[200px]' : ''
                    } flex items-center justify-center 
                    hover:border-primary-500 transition-colors cursor-pointer`}
                  >
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleImageChange}
                      className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                    />
                    {previewImage ? (
                      <div className='relative w-full h-64 rounded-lg overflow-hidden'>
                        <Image
                          src={previewImage}
                          alt='Program preview'
                          fill
                          sizes='100vw'
                          className='object-cover'
                        />
                        <button
                          type='button'
                          onClick={removeImage}
                          className='absolute top-2 right-2 bg-primary-500 p-1.5 rounded-full 
                                  hover:bg-primary-600 transition-colors'
                        >
                          <Trash className='w-4 h-4 text-white-100' />
                        </button>
                      </div>
                    ) : (
                      <div className='flex flex-col items-center p-8 text-center'>
                        <ImageIcon className='w-12 h-12 text-primary-300 mb-4' />
                        <p className='text-primary-500 font-medium'>
                          Click to upload Program thumbnail
                        </p>
                        <p className='text-sm text-primary-300 mt-2'>
                          Recommended size: 1280x720 pixels
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className='bg-card p-6 rounded-xl shadow-sm border border-primary-100'>
                <h3 className='text-lg font-semibold text-primary-900 mb-4'>
                  Program Details
                </h3>
                <div className='grid grid-cols-2 gap-4'>
                  <CustomFormField
                    name='courseCategory'
                    label='Category'
                    type='select'
                    placeholder='Select category'
                    labelClassName='text-primary-900'
                    options={[
                      { value: 'anatomy', label: 'Anatomy' },
                      { value: 'physiology', label: 'Physiology' },
                      { value: 'biochemistry', label: 'Biochemistry' },
                      { value: 'pharmacology', label: 'Pharmacology' },
                    ]}
                  />
                  <CustomFormField
                    name='courseLevel'
                    label='Difficulty Level'
                    type='select'
                    labelClassName='text-primary-900'
                    options={[
                      { value: 'beginner', label: 'Beginner' },
                      { value: 'intermediate', label: 'Intermediate' },
                      { value: 'advanced', label: 'Advanced' },
                    ]}
                  />
                  <CustomFormField
                    name='coursePrice'
                    label='Price (USD)'
                    type='number'
                    placeholder='0'
                    labelClassName='text-primary-900'
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Course Content */}
            <div className='space-y-6'>
              <div className='bg-primary-50 p-6 rounded-xl shadow-lg border border-primary-100'>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-xl font-semibold text-primary-900'>
                    Program Content
                  </h2>
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={() =>
                      dispatch(openSectionModal({ sectionIndex: null }))
                    }
                    className='bg-primary-500 hover:bg-primary-600 text-white-100 shadow-sm'
                  >
                    <Plus className='mr-2 h-4 w-4' />
                    Add Module
                  </Button>
                </div>

                {isLoading ? (
                  <div className='flex justify-center items-center h-32'>
                    <Loader2 className='h-8 w-8 animate-spin text-primary-300' />
                  </div>
                ) : sections.length > 0 ? (
                  <DroppableComponent />
                ) : (
                  <div className='text-center p-6 text-primary-300'>
                    No modules added yet. Start by creating your first module!
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </Form>

      <ChapterModal />
      <SectionModal />
    </div>
  );
};

export default CourseEditor;
