import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { CallbackDefault } from '../../../types/commonTypes';

interface ConfirmModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  content?: string;
  closeBtnText: string;
  confirmBtnText: string;
  onConfirm: CallbackDefault;
}

const ConfirmModal = ({
  isOpen,
  setIsOpen,
  title,
  content,
  closeBtnText,
  confirmBtnText,
  onConfirm,
}: ConfirmModalProps) => {
  const handleClose = () => setIsOpen(false);

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {!!title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
        {!!content && (
          <DialogContent>
            <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose}>{closeBtnText}</Button>
          <Button onClick={handleConfirm} autoFocus>
            {confirmBtnText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmModal;
