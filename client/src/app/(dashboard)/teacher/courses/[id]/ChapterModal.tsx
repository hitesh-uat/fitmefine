import { CustomFormField } from '@/components/CustomFormField';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { ChapterFormData, chapterSchema } from '@/lib/schemas';
import { addChapter, closeChapterModal, editChapter } from '@/state';
import { useUploadFileMutation } from '@/state/api';
import { useAppDispatch, useAppSelector } from '@/state/redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { FileVideo, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

const ChapterModal = () => {
  const dispatch = useAppDispatch();
  const {
    isChapterModalOpen,
    selectedSectionIndex,
    selectedChapterIndex,
    sections,
  } = useAppSelector((state) => state.global.courseEditor);
  const [uploadFile] = useUploadFileMutation();
  const [existingVideo, setExistingVideo] = useState<string | null>(null);

  const chapter: Chapter | undefined =
    selectedSectionIndex !== null && selectedChapterIndex !== null
      ? sections[selectedSectionIndex].chapters[selectedChapterIndex]
      : undefined;

  const methods = useForm<ChapterFormData>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      title: '',
      content: '',
      video: undefined,
      quizzes: [],
    },
  });

  const {
    fields: quizzes,
    append: appendQuiz,
    remove: removeQuiz,
    update: updateQuiz,
  } = useFieldArray({
    control: methods.control,
    name: 'quizzes',
  });

  useEffect(() => {
    if (chapter) {
      methods.reset({
        title: chapter.title,
        content: chapter.content,
        video: undefined,
        quizzes:
          chapter.quizzes?.map((quiz) => ({
            ...quiz,
            options: quiz.options.map((option) => ({
              id: option.id,
              value: option.value,
            })),
          })) || [],
      });
      setExistingVideo(
        typeof chapter.video === 'string' ? chapter.video : null
      );
    } else {
      methods.reset({
        title: '',
        content: '',
        video: undefined,
        quizzes: [],
      });
      setExistingVideo(null);
    }
  }, [chapter, methods]);

  const onClose = () => {
    dispatch(closeChapterModal());
    methods.reset();
  };

  const onSubmit = async (data: ChapterFormData) => {
    if (selectedSectionIndex === null) return;

    let videoUrl = data.video;
    if (data.video instanceof File) {
      try {
        const formData = new FormData();
        formData.append('file', data.video);
        const result = await uploadFile(formData).unwrap();
        videoUrl = result.url;
      } catch (error) {
        toast.error(`Error: ${error}`);
        return;
      }
    }

    const newChapter: Chapter = {
      chapterId: chapter?.chapterId || uuidv4(),
      title: data.title,
      content: data.content,
      type: videoUrl ? 'Video' : 'Text',
      ...(videoUrl && { video: videoUrl }),
      quizzes: data.quizzes.map((quiz) => ({
        id: quiz.id,
        question: quiz.question,
        options: quiz.options.map((option) => ({
          id: option.id,
          value: option.value,
        })),
        correctAnswer: quiz.correctAnswer,
      })),
    };

    if (selectedChapterIndex === null) {
      dispatch(
        addChapter({
          sectionIndex: selectedSectionIndex,
          chapter: newChapter,
        })
      );
    } else {
      dispatch(
        editChapter({
          sectionIndex: selectedSectionIndex,
          chapterIndex: selectedChapterIndex,
          chapter: newChapter,
        })
      );
    }

    toast.success(`Lesson ${chapter ? 'updated' : 'added'} successfully`);
    onClose();
  };

  const addOption = (quizIndex: number) => {
    const currentQuiz = methods.getValues(`quizzes.${quizIndex}`);
    const newOptions = [...currentQuiz.options, { id: uuidv4(), value: '' }];
    updateQuiz(quizIndex, { ...currentQuiz, options: newOptions });
  };

  const removeOption = (quizIndex: number, optionIndex: number) => {
    const currentQuiz = methods.getValues(`quizzes.${quizIndex}`);
    const optionIdToRemove = currentQuiz.options[optionIndex].id;
    const newOptions = currentQuiz.options.filter(
      (_, index) => index !== optionIndex
    );

    const updatedQuiz = {
      ...currentQuiz,
      options: newOptions,
      correctAnswer:
        currentQuiz.correctAnswer === optionIdToRemove
          ? ''
          : currentQuiz.correctAnswer,
    };

    updateQuiz(quizIndex, updatedQuiz);
  };

  const videoUrl = methods.watch('video');
  const isValidVideoUrl =
    typeof videoUrl === 'string' && videoUrl.startsWith('http');

  return (
    <AnimatePresence>
      {isChapterModalOpen && (
        <Dialog
          open={isChapterModalOpen}
          onOpenChange={(open) => !open && onClose()}
        >
          <DialogContent className='max-w-2xl bg-primary-50/95 backdrop-blur-md border border-primary-200/50 shadow-xl'>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader>
                <div className='flex justify-between items-center pb-4 border-b border-primary-200/30'>
                  <DialogTitle className='text-xl font-bold text-primary-900'>
                    {chapter ? 'Edit Lesson' : 'Create New Lesson'}
                  </DialogTitle>
                </div>
              </DialogHeader>

              <Form {...methods}>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className='space-y-6'
                >
                  <div className='space-y-4 max-h-[60vh] overflow-y-auto'>
                    <CustomFormField
                      name='title'
                      label='Lesson Title'
                      placeholder='Introduction to Human Anatomy'
                      className='bg-white/80 backdrop-blur-sm py-4'
                      labelClassName='text-primary-900 pl-7'
                      inputClassName='focus:ring-primary-300 pl-7'
                    />

                    <CustomFormField
                      name='content'
                      label='Lesson Content'
                      type='textarea'
                      placeholder='Detailed lesson content...'
                      className='bg-white/80 backdrop-blur-sm py-4'
                      labelClassName='text-primary-900 pl-7'
                      inputClassName='focus:ring-primary-300 pl-7'
                    />

                    <div className='space-y-4'>
                      {existingVideo && (
                        <div className='flex items-center justify-between p-3 bg-primary-50 rounded-lg border border-primary-200/50'>
                          <div className='flex items-center gap-3'>
                            <FileVideo className='w-5 h-5 text-primary-600' />
                            <span className='text-sm text-primary-800'>
                              {existingVideo.split('/').pop()}
                            </span>
                          </div>
                          <Button
                            type='button'
                            variant='ghost'
                            size='sm'
                            className='text-primary-600 hover:bg-primary-100/50'
                            onClick={() => setExistingVideo(null)}
                          >
                            <X className='w-4 h-4' />
                          </Button>
                        </div>
                      )}

                      {!existingVideo && (
                        <CustomFormField
                          name='video'
                          label='Video Content'
                          type='file'
                          accept='video/*'
                          className='bg-white/80 backdrop-blur-sm hover:bg-primary-100 py-4'
                          labelClassName='text-primary-900 pl-7 hover:bg-primary-100'
                          inputClassName='cursor-pointer file:text-primary-500 bg-primary-50 file:bg-primary-50 file:border-0 file:rounded-md file:px-4 file:py-2 hover:file:bg-primary-100'
                        />
                      )}
                    </div>

                    <div className='space-y-4'>
                      <div className='flex items-center justify-between'>
                        <h3 className='text-lg font-semibold text-primary-900'>
                          Quizzes
                        </h3>
                        <Button
                          type='button'
                          onClick={() =>
                            appendQuiz({
                              question: '',
                              options: [],
                              correctAnswer: '',
                              id: uuidv4(),
                            })
                          }
                          className='bg-primary-500/90 hover:bg-primary-600 text-white/95'
                        >
                          <Plus className='w-4 h-4 mr-2' />
                          Add Quiz
                        </Button>
                      </div>

                      <AnimatePresence>
                        {quizzes.map((quiz, quizIndex) => (
                          <motion.div
                            key={quiz.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className='p-4 bg-white/80 rounded-lg border border-primary-200/50 space-y-4'
                          >
                            <input
                              type='hidden'
                              {...methods.register(`quizzes.${quizIndex}.id`)}
                            />
                            <div className='flex justify-between items-center'>
                              <h4 className='font-medium text-primary-800'>
                                Quiz {quizIndex + 1}
                              </h4>
                              <Button
                                type='button'
                                variant='ghost'
                                size='sm'
                                className='text-red-600 hover:bg-red-50/50'
                                onClick={() => removeQuiz(quizIndex)}
                              >
                                <X className='w-4 h-4' />
                              </Button>
                            </div>

                            <CustomFormField
                              name={`quizzes.${quizIndex}.question`}
                              label='Question'
                              placeholder='Enter the question'
                              className='bg-white'
                              labelClassName='text-primary-900'
                              inputClassName='focus:ring-primary-300'
                            />

                            <div className='space-y-3'>
                              {quiz.options.map((option, optionIndex) => (
                                <motion.div
                                  key={option.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 10 }}
                                  className='flex items-center gap-2'
                                >
                                  <CustomFormField
                                    name={`quizzes.${quizIndex}.options.${optionIndex}.value`}
                                    label=''
                                    placeholder={`Option ${optionIndex + 1}`}
                                    className='flex-1'
                                    labelClassName='hidden'
                                    inputClassName='pl-3'
                                  />
                                  <Button
                                    type='button'
                                    variant='ghost'
                                    size='sm'
                                    className='text-red-500 hover:bg-red-50/50'
                                    onClick={() =>
                                      removeOption(quizIndex, optionIndex)
                                    }
                                  >
                                    <X className='w-4 h-4' />
                                  </Button>
                                </motion.div>
                              ))}
                              <Button
                                type='button'
                                variant='outline'
                                className='border-primary-300/50 text-primary-700 w-full'
                                onClick={() => addOption(quizIndex)}
                              >
                                <Plus className='w-4 h-4 mr-2' />
                                Add Option
                              </Button>
                            </div>

                            <div className='pt-2'>
                              <CustomFormField
                                key={`quiz-${quiz.id}-${quiz.options.length}`}
                                name={`quizzes.${quizIndex}.correctAnswer`}
                                label='Correct Answer'
                                type='select'
                                className='bg-white'
                                placeholder='Select correct answer'
                                options={
                                  quiz.options.length > 0
                                    ? quiz.options.map((option, index) => ({
                                        value: option.id,
                                        label: `Option ${index + 1} - ${
                                          option.value || 'New Option'
                                        }`,
                                      }))
                                    : []
                                }
                              />
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className='flex justify-end gap-4 pt-6 border-t border-primary-200/30'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={onClose}
                      className='border-primary-300/50 text-primary-700 bg-white/80 hover:bg-primary-50/80'
                    >
                      Cancel
                    </Button>
                    <Button
                      type='submit'
                      className='bg-primary-500/90 hover:bg-primary-600 px-6 py-3 rounded-lg font-semibold shadow-sm transition-all backdrop-blur-sm text-white/95'
                    >
                      {chapter ? 'Update Lesson' : 'Create Lesson'}
                    </Button>
                  </div>
                </form>
              </Form>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ChapterModal;
