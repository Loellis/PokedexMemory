import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';

const FeedbackModal = ({ open, feedback, onClose, onContinue }) => {
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
