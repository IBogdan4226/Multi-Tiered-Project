import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useTestActions } from 'app/src/hooks/useTestActions';
import { StudentGradeDTO } from 'app/src/types/Question';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const TestStudentDetails = () => {
  const [testStudentData, setTestStudentData] = useState<StudentGradeDTO | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { testStudentId } = useParams();
  const { _getStudentFromTest, _updateStudentFromTest } = useTestActions();

  useEffect(() => {
    getData(testStudentId);
  }, [testStudentId]);

  const getData = async (testStudentId: string | undefined) => {
    if (!testStudentId) return;
    const res = await _getStudentFromTest(testStudentId);
    if (res) {
      setTestStudentData(res.data);
    }
  };

  const handleUpdate = async () => {
    if (!testStudentData) return;
    const { grade, note } = testStudentData;

    if (!grade || grade < 0 || grade > 10) {
      setErrorMessage('Grade must be between 0 and 10');
      setSuccessMessage(null);  
      return;
    }

    const res = await _updateStudentFromTest(testStudentId!, note, grade);
    if (res) {
      setSuccessMessage('Updated successfully!');
      setErrorMessage(null);  
    } else {
      setErrorMessage('Failed to update. Please try again.');
      setSuccessMessage(null);  
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<any>,
    field: keyof StudentGradeDTO
  ) => {
    if (!testStudentData) return;
    setTestStudentData({
      ...testStudentData,
      [field]: e.target.value,
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 4,
      }}
    >
      <Paper elevation={3} sx={{ padding: 2, width: '100%', maxWidth: 600 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          {testStudentData?.studentName}
        </Typography>

        <TextField
          label="Note"
          value={testStudentData?.note || ''}
          fullWidth
          margin="normal"
          onChange={(e) => handleInputChange(e, 'note')}
        />

        <TextField
          label="Grade"
          value={testStudentData?.grade || ''}
          fullWidth
          margin="normal"
          type="number"
          onChange={(e) => handleInputChange(e, 'grade')}
        />

        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
            {errorMessage}
          </Typography>
        )}
        {successMessage && (
          <Typography variant="body2" color="primary" sx={{ marginTop: 2 }}>
            {successMessage}
          </Typography>
        )}

        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Box>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          padding: 2,
          marginTop: 4,
          width: '100%',
          maxWidth: 600,
          textAlign: 'center',
        }}
      >
        {testStudentData?.testPhoto ? (
          <img
            src={`${testStudentData?.testPhoto}`}
            alt="Test"
            style={{ width: '100%', height: 'auto', maxHeight: '500px' }}
          />
        ) : (
          <Typography variant="body1" color="textSecondary">
            No photo saved for this test.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};