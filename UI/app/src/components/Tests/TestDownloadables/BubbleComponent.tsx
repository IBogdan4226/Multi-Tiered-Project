import { Box, Typography } from '@mui/material';

export type BubbleComponentProps = {
  indexQuestion: number;
  totalQuestions: number;
  numberOfAnswers: number;
};

const BubbleComponent = ({
  indexQuestion,
  totalQuestions,
  numberOfAnswers,
}: BubbleComponentProps) => {
  const bubbleContainerStyle = {
    width: '100%',
    background: 'transparent',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    marginLeft:
      indexQuestion + 1 <= Math.floor(totalQuestions / 2) ? '0' : '100px',
    marginBottom: '10px',
  };

  const questionIndexStyle = {
    fontSize: '1.45rem',
    fontWeight: 800,
    display: 'inline',
    marginRight: '20px',
    width: '45px',
    textAlign: 'end',
    marginBottom: '2px',
  };

  const bubbleStyle = {
    fontSize: '1.3rem',
    display: 'inline-block',
    border: '3px solid black',
    borderRadius: '50%',
    padding: '7px 11px',
    marginRight: '25px',
    color: 'rgb(172, 169, 169)',
    lineHeight: '1.27rem',
  };

  return (
    <Box sx={bubbleContainerStyle}>
      <Typography sx={questionIndexStyle}>
        Q{indexQuestion + 1 < 10 ? '0' : ''}
        {indexQuestion + 1}
      </Typography>
      {Array.from({ length: numberOfAnswers }, (_, index) => (
        <Typography key={index} sx={bubbleStyle}>
          {String.fromCharCode(65 + index)}
        </Typography>
      ))}
    </Box>
  );
};

export default BubbleComponent;
