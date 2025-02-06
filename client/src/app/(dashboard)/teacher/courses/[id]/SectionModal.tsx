import { CustomFormField } from '@/components/CustomFormField';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { SectionFormData, sectionSchema } from '@/lib/schemas';
import { addSection, closeSectionModal, editSection } from '@/state';
import { useAppDispatch, useAppSelector } from '@/state/redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

const SectionModal2 = () => {
  const dispatch = useAppDispatch();
  const { isSectionModalOpen, selectedSectionIndex, sections } = useAppSelector(
    (state) => state.global.courseEditor
  );

  const section =
    selectedSectionIndex !== null ? sections[selectedSectionIndex] : null;

  const methods = useForm<SectionFormData>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      title: '',
      description: '',
      objectives: '',
      duration: '',
    },
  });

  useEffect(() => {
    if (section) {
      methods.reset({
        title: section.sectionTitle,
        description: section.sectionDescription,
        objectives: section.objectives || '',
        duration: section.duration?.toString() || '',
      });
    } else {
      methods.reset({
        title: '',
        description: '',
        objectives: '',
        duration: '',
      });
    }
  }, [section, methods]);

  const onClose = () => {
    dispatch(closeSectionModal());
    methods.reset();
  };

  const onSubmit = (data: SectionFormData) => {
    const newSection: Section = {
      sectionId: section?.sectionId || uuidv4(),
      sectionTitle: data.title,
      sectionDescription: data.description,
      duration: Number(data.duration) || 0,
      chapters: section?.chapters || [],
    };

    if (selectedSectionIndex === null) {
      dispatch(addSection(newSection));
    } else {
      dispatch(
        editSection({
          index: selectedSectionIndex,
          section: newSection,
        })
      );
    }

    toast.success(
      `Section ${
        selectedSectionIndex === null ? 'added' : 'updated'
      } successfully`
    );
    onClose();
  };

  return (
    <Dialog
      open={isSectionModalOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent className='max-w-2xl bg-white-100 backdrop-blur-md border border-primary-200/50 shadow-xl'>
        <DialogHeader>
          <div className='flex justify-between items-center pb-4 border-b border-primary-200/30'>
            <DialogTitle className='text-xl font-bold text-primary-800'>
              {section ? 'Edit Module' : 'Create New Module'}
            </DialogTitle>
          </div>
        </DialogHeader>

        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='grid grid-cols-2 gap-6'>
              {/* Left Column */}
              <div className='space-y-4'>
                <CustomFormField
                  name='title'
                  label='Module Title'
                  placeholder='Introduction to Anatomy'
                  className='bg-white/80 backdrop-blur-sm'
                  labelClassName='text-primary-900'
                  inputClassName='focus:ring-primary-300'
                />

                <CustomFormField
                  name='description'
                  label='Module Description'
                  type='textarea'
                  placeholder='Describe what this module covers...'
                  className='bg-white/80 backdrop-blur-sm'
                  labelClassName='text-primary-900'
                  inputClassName='focus:ring-primary-300'
                />
              </div>

              {/* Right Column */}
              <div className='space-y-4'>
                <CustomFormField
                  name='duration'
                  label='Estimated Duration (minutes)'
                  type='number'
                  className='bg-white/80 backdrop-blur-sm'
                  labelClassName='text-primary-900'
                  inputClassName='focus:ring-primary-300'
                />

                <CustomFormField
                  name='objectives'
                  label='Learning Objectives'
                  type='textarea'
                  placeholder='Enter one learning objective per line'
                  className='bg-white/80 backdrop-blur-sm'
                  labelClassName='text-primary-900'
                  inputClassName='focus:ring-primary-300'
                />
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
                {section ? 'Update Module' : 'Create Module'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SectionModal2;
