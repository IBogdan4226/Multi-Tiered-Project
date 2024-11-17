import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { ExtendedQuestionDTO } from 'app/src/types/Question';
import { ChangeEvent } from 'react';

interface SingleQuestionProps {
  question: ExtendedQuestionDTO;
  questionChange: (questionId: number, newQuestion: string) => void;
  answerChange: (
    questionId: number,
    answerId: number,
    newAnswer: string
  ) => void;
  correctChange: (questionId: number, answerId: number) => void;
  deleteQuestion: (questionId: number) => void;
  addAnswer: (questionId: number) => void;
  deleteAnswer: (questionId: number, answerId: number) => void;
}

export const SingleQuestion = ({
  question,
  questionChange,
  answerChange,
  correctChange,
  deleteQuestion,
  addAnswer,
  deleteAnswer,
}: SingleQuestionProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mb: 2,
        border: `1px solid ${question.isValid ? 'black' : 'red'}`,
        borderRadius: 2,
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'white',
        position: 'relative',
        height: '280px',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          pt: 1,
        }}
      >
        <TextField
          variant="standard"
          placeholder={`Question ${question.qId}`}
          value={question.question}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            questionChange(question.qId, e.target.value)
          }
          fullWidth
          multiline
          rows={2}
          InputProps={{
            disableUnderline: true,
            sx: {
              fontSize: '1rem',
              fontWeight: 'bold',
              borderBottom: '1px solid #dadce0',
              paddingX: 1,
            },
          }}
        />
        <IconButton
          sx={{
            position: 'absolute',
            right: 4,
            top: 4,
          }}
          onClick={() => deleteQuestion(question.qId)}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 1,
          height: '100%',
        }}
      >
        <div>
          {question.answers.map((answer, index) => (
            <Box
              key={answer.aId}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                height: '30px',
              }}
            >
              <Checkbox
                checked={answer.isCorrect}
                onChange={() => correctChange(question.qId, answer.aId)}
                sx={{
                  width: '1.3em',
                  height: '1.3em',
                  '&.Mui-checked': {
                    color: 'green',
                  },
                }}
              />
              <TextField
                variant="standard"
                placeholder={`Answer ${index + 1}`}
                value={answer.answer}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  answerChange(question.qId, answer.aId, e.target.value)
                }
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    fontSize: '1rem',
                    borderBottom: '1px solid #dadce0',
                    pl: 1,
                  },
                }}
              />
              {question.answers.length > 2 && (
                <IconButton
                  onClick={() => deleteAnswer(question.qId, answer.aId)}
                  sx={{ ml: 1 }}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Box>
          ))}
        </div>
        {question.answers.length < 6 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              mt: 1,
            }}
          >
            <Button variant="outlined" onClick={() => addAnswer(question.qId)}>
              Add Answer
            </Button>
          </Box>
        )}
      </Box>

      {!question.isValid && (
        <Typography
          sx={{
            fontSize: '0.65rem',
            fontWeight: 'bold',
            color: 'red',
            position: 'absolute',
            bottom: 3,
            right: 10,
          }}
        >
          Invalid question!
        </Typography>
      )}
    </Box>
  );
};
