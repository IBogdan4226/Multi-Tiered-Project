import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

export type TestStudentModalProps = {
  isModalOpen: boolean;
  onModalClose: () => void;
  onSave: (
    studentId: string,
    grade: number,
    note: string,
    image: string | null
  ) => void;
  students: { name: string; id: string }[];
  error: string | null;
};

export const TestStudentModal = ({
  isModalOpen,
  onModalClose,
  students,
  onSave,
  error,
}: TestStudentModalProps) => {
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [grade, setGrade] = useState<number | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [note, setNote] = useState<string>('');
  const [inputErrors, setInputErrors] = useState<{
    student?: string;
    grade?: string;
  }>({});

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const errors: { student?: string; grade?: string } = {};

    if (!selectedStudent) {
      errors.student = 'Please select a student.';
    }

    if (grade === null || grade === undefined || grade < 1 || grade > 10) {
      errors.grade = 'Please enter a grade.';
    }

    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
      return;
    }

    setInputErrors({});
    onSave(selectedStudent, grade!, note, image);
  };

  return (
    <Modal open={isModalOpen} onClose={onModalClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: 800,
          maxWidth: '90%',
        }}
      >
        <Typography
          id="add-student-modal-title"
          variant="h6"
          component="h2"
          mb={2}
        >
          Add Student to Test
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: '100%',
                height: 245,
                border: '1px dashed gray',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: '#f9f9f9',
              }}
            >
              {image ? (
                <img
                  src={image}
                  alt="Uploaded"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              ) : (
                <Typography>Select an image</Typography>
              )}
              <input
                type="file"
                accept="image/*"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer',
                }}
                onChange={handleImageChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth sx={{ mb: 2 }} error={!!inputErrors.student}>
              <InputLabel id="student-select-label">Select Student</InputLabel>
              <Select
                labelId="student-select-label"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                label="Select Student"
              >
                {students.map((student) => (
                  <MenuItem key={student.id} value={student.id}>
                    {student.name}
                  </MenuItem>
                ))}
              </Select>
              {inputErrors.student && (
                <Typography color="error" variant="caption">
                  {inputErrors.student}
                </Typography>
              )}
            </FormControl>
            <TextField
              type="number"
              label="Grade"
              value={grade || ''}
              onChange={(e) =>
                setGrade(e.target.value === '' ? null : Number(e.target.value))
              }
              fullWidth
              sx={{ mb: 2 }}
              inputProps={{
                autoComplete: 'off',
              }}
              error={!!inputErrors.grade}
              helperText={inputErrors.grade}
            />
            <TextField
              label="Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              multiline
              rows={3}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        {error && (
          <Typography
            color="error"
            sx={{ mb: 2 }}
            role="alert"
            data-testid="global-error"
          >
            {error}
          </Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onModalClose}
            sx={{ mr: 1 }}
          >
            Close
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
