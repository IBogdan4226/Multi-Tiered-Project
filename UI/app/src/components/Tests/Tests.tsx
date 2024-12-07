import { Box, Button, TextField, Typography } from '@mui/material';
import debounce from '@mui/utils/debounce';
import { AppRoute } from 'app/src/App';
import { useTestActions } from 'app/src/hooks/useTestActions';
import { TestPreviewDTO } from 'app/src/types/Question';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TestPreview } from './TestPreview/TestPreview';

export const Tests = () => {
  const [tests, setTests] = useState<TestPreviewDTO[]>([]);
  const [filterName, setFilterName] = useState<string>('');
  const { _getTests } = useTestActions();
  const navigate = useNavigate();

  const handleFilterChange = useCallback(
    debounce((value: string) => {
      setFilterName(value);
    }, 500),
    []
  );

  useEffect(() => {
    getTests(filterName);
  }, [filterName]);

  const getTests = async (filterName: string) => {
    const res = await _getTests(filterName);
    if (res) {
      setTests(res);
    }
  };

  return (
    <Box sx={{ padding: 3 }} data-testid="tests-container">
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}
        data-testid="filter-container"
      >
        <TextField
          label="Filter by name"
          variant="outlined"
          fullWidth
          onChange={(e) => handleFilterChange(e.target.value)}
          data-testid="name-filter"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(AppRoute.CREATETEST)}
          sx={{ whiteSpace: 'nowrap' }}
          data-testid="create-test-button"
        >
          Create Test
        </Button>
      </Box>
      {tests.length === 0 ? (
        <Typography
          variant="body1"
          color="textSecondary"
          data-testid="no-tests-message"
        >
          No tests available.
        </Typography>
      ) : (
        <Box
          sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}
          data-testid="tests-list"
        >
          {tests.map((test) => (
            <TestPreview key={test.id} id={test.id} title={test.name} />
          ))}
        </Box>
      )}
    </Box>
  );
};
