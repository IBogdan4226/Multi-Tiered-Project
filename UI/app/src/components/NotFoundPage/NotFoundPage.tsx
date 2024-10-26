import { Box, Typography } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
        bgcolor: '#f5f5f5',
      }}
    >
      <Typography
        variant="h1"
        component="h2"
        sx={{ fontSize: '6rem', fontWeight: 'bold' }}
      >
        404
      </Typography>
      <Typography variant="h4" component="h2" sx={{ marginBottom: 2 }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 3 }}>
        The page you are looking for does not exist.
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
