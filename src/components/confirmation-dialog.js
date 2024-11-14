import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const ConfirmationPopup = ({ open, handleClose, handleConfirm, taskName }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Complete Task</DialogTitle>
      <DialogContent>
        <DialogContentText align='center'>
          Are you sure you want to mark the task "<b style={{ textTransform: 'capitalize' }}>{taskName}</b>" as complete?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={handleConfirm} color="secondary">Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationPopup;
