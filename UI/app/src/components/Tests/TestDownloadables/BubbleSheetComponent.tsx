import { Box, Divider, TextField, Typography } from '@mui/material';
import QRCode from 'react-qr-code';
import BubbleComponent from './BubbleComponent';

interface BubbleSheetProps {
  id: string;
  title: string;
  noQuestions: number;
}

const BubbleSheetComponent = ({ id, title, noQuestions }: BubbleSheetProps) => {
  return (
    <Box
      sx={{
        padding: '30px 35px 25px',
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', marginBottom: '15px' }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              sx={{
                textAlign: 'center',
                marginBottom: '25px',
              }}
            >
              {title}
            </Typography>
            {['Nume întreg', 'Grupa'].map((label, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  marginBottom: '10px',
                }}
              >
                <Typography
                  sx={{
                    width: '205px',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                  }}
                >
                  {label}
                </Typography>
                <TextField
                  variant="standard"
                  disabled
                  fullWidth
                  sx={{
                    border: 'none',
                    borderBottom: '1px solid lightgray',
                  }}
                  InputProps={{ disableUnderline: true }}
                />
              </Box>
            ))}
          </Box>
          <Box
            sx={{ display: 'flex', alignItems: 'flex-end', marginLeft: '20px' }}
          >
            <QRCode size={165} value={JSON.stringify({ id })} />
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            marginTop: '16px',
            columns: 2,
            columnWidth: '250px',
            paddingRight: '15px',
          }}
        >
          {Array.from({ length: noQuestions }, (_, index) => (
            <BubbleComponent
              key={index}
              indexQuestion={index}
              totalQuestions={noQuestions}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BubbleSheetComponent;
