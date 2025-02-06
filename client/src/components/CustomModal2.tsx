import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const CustomModal2 = ({ isOpen, onClose, children }: CustomFixedModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className='custom-modal__overlay' onClick={onClose} />
      <Dialog>
        <DialogTrigger asChild>
          <button>Edit Prohole</button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when yore done.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>Name</div>
            <div className='grid grid-cols-4 items-center gap-4'>Username</div>
          </div>
          <DialogFooter>
            <button type='submit'>Save changes</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomModal2;
