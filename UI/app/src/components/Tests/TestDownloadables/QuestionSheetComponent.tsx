import { Box, Typography } from '@mui/material';
import { QuestionDTO } from 'app/src/types/Question';
import QuestionComponent from './QuestionComponent';

interface QuestionSheetProps {
  title: string;
  questions: QuestionDTO[];
}

const QuestionSheetComponent = ({ title, questions }: QuestionSheetProps) => {
  return (
    <Box sx={{ width: '100%', height: '100%', paddingBottom: '3rem' }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
          fontSize: '1.9rem',
          fontWeight: 500,
          textAlign: 'center',
          padding: '2rem 0',
        }}
      >
        {title}
      </Typography>
      <Box sx={{ padding: '0 2rem' }}>
        {questions.map((question, index) => (
          <QuestionComponent key={index} question={question} />
        ))}
      </Box>
    </Box>
  );
};

export default QuestionSheetComponent;
