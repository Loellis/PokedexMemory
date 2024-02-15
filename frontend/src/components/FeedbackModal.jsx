import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import { useEffect } from 'react';

const FeedbackModal = ({ open, feedback, onClose, onContinue }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onContinue()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>{feedback}</DialogContent>
      <DialogActions>
        <Button onClick={onContinue}>Continue</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackModal;
