import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { Student } from 'app/src/types/Question';

interface StudentModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, group: string, id: string | undefined) => void;
  initialState: Student | null;
}

export const StudentModal = ({
  open,
  onClose,
  onSave,
  initialState,
}: StudentModalProps) => {
  const [name, setName] = useState<string>('');
  const [group, setGroup] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [groupError, setGroupError] = useState<string>('');

  useEffect(() => {
    if (initialState) {
      setName(initialState.name || '');
      setGroup(initialState.group || '');
    }
  }, [initialState]);

  const handleSave = () => {
    const groupPattern = /^\d{4}[A-Z]$/;
    const trimmedName = name.trim();

    if (trimmedName.length <= 3) {
      setNameError('Name must be more than 3 characters long after trimming.');
      return;
    }

    if (!groupPattern.test(group)) {
      setGroupError('Group must match pattern xxxxY (e.g., 1204A)');
      return;
    }

    setNameError('');
    setGroupError('');
    onSave(trimmedName, group, initialState?.id);
  };

  return (
    <Modal open={open} onClose={onClose} data-testid="student-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h6">
          {initialState ? 'Edit Student' : 'Add Student'}
        </Typography>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          error={!!nameError}
          helperText={nameError}
        />
        <TextField
          label="Group"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          fullWidth
          error={!!groupError}
          helperText={groupError}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={onClose} color="secondary" data-testid="close">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {initialState ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
