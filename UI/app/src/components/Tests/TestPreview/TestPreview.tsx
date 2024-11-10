import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

interface TestPreviewProps {
  id: string;
  title: string;
}

export const TestPreview = ({ id, title }: TestPreviewProps) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const goToUpdate = () => {
    navigate(`/update-test/${id}`);
  };

  const goToDetails = () => {
    navigate(`/test-details/${id}`);
  };

  return (
    <Box
      sx={{
        width: 100,
        height: 150,
        border: '1px solid #ddd',
        padding: 2,
        borderRadius: 1,
        boxShadow: hover ? 3 : 1,
        transition: 'box-shadow 0.3s ease',
        cursor: 'pointer',
        ':hover': { boxShadow: 3 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Typography
        variant="h6"
        component="h3"
        sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {title}
      </Typography>
      {hover && (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={goToUpdate}
            sx={{ width: '100%' }}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={goToDetails}
            sx={{ width: '100%' }}
          >
            Details
          </Button>
        </Box>
      )}
    </Box>
  );
};
