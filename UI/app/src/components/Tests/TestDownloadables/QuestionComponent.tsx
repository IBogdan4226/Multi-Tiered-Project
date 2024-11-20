import { Box, Typography } from '@mui/material';
import { QuestionDTO } from 'app/src/types/Question';

export type QuestionComponentProps = {
  question: QuestionDTO;
};

const indexToLetterMap: { [key: number]: string } = {
  1: '(a)',
  2: '(b)',
  3: '(c)',
  4: '(d)',
};

const QuestionComponent = ({ question: questionP }: QuestionComponentProps) => {
  const { qId, question, answers } = questionP;

  return (
    <Box sx={{ width: '100%', marginBottom: '0.5rem' }}>
      <Box
        sx={{
          fontFamily: "'Times New Roman', Times, serif",
        }}
      >
        <Typography
          component="span"
          sx={{
            display: 'inline',
            marginRight: '10px',
            fontSize: '1.25rem',
            fontWeight: 700,
          }}
        >
          {qId}.
        </Typography>
        <Typography
          component="span"
          sx={{
            display: 'inline',
            marginRight: '10px',
            fontSize: '1.25rem',
            fontWeight: 700,
          }}
        >
          {question}
        </Typography>
      </Box>
      <Box
        sx={{
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: '0.8rem',
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {answers.map((answer, index) => {
          const isLastAnswer = index === answers.length - 1;
          const punctuationMark = isLastAnswer ? '.' : ';';
          return (
            <Typography
              key={index}
              component="span"
              sx={{ marginRight: '20px', fontSize: 'inherit' }}
            >
              {indexToLetterMap[answer.aId]} {answer.answer}
              {punctuationMark}
            </Typography>
          );
        })}
      </Box>
    </Box>
  );
};

export default QuestionComponent;
