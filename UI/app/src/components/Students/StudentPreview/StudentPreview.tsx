import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';

interface StudentPreviewProps {
  id: string;
  name: string;
  group: string;
  onClickUpdate: (id: string) => void;
}

export const StudentPreview = ({
  id,
  name,
  group,
  onClickUpdate,
}: StudentPreviewProps) => {
  const [hover, setHover] = useState(false);

  const goToUpdate = () => {
    onClickUpdate(id);
  };

  return (
    <Box
      sx={{
        width: 150,
        height: 250,
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
        {name}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'gray',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
      >
        {group}
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
        </Box>
      )}
    </Box>
  );
};