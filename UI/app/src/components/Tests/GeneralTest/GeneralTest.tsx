import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid2,
  TextField,
} from '@mui/material';
import { useAuthContext } from 'app/src/context/AuthProviderContext';
import { ExtendedQuestionDTO, QuestionDTO } from 'app/src/types/Question';
import { useEffect, useState } from 'react';
import { singleQuestion } from '../CreateTest/CreateTest.utils';
import {
  transformQuestions,
  validateQuestion,
  validateTest,
} from './GeneralTest.utils';
import { SingleQuestion } from './SingleQuestion/SingleQuestion';

type GeneralTestProps = {
  initialQuestions: ExtendedQuestionDTO[];
  testNameProp: string;
  onSave: (
    testName: string,
    teacherId: string,
    questions: QuestionDTO[]
  ) => void;
};

const GeneralTest = ({
  initialQuestions,
  testNameProp,
  onSave,
}: GeneralTestProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] =
    useState<ExtendedQuestionDTO[]>(initialQuestions);
  const [testName, setTestName] = useState(testNameProp);
  const [errorSend, setErrorSend] = useState('');
  const { auth } = useAuthContext();

  useEffect(() => {
    setQuestions(initialQuestions);
  }, [initialQuestions]);

  useEffect(() => {
    setTestName(testNameProp);
  }, [testNameProp]);

  const addQuestion = () => {
    if (questions.length < 40) {
      const newQuestion = { ...singleQuestion, qId: questions.length + 1 };
      setQuestions((prev) => [...prev, newQuestion]);
    }
  };

  const modifyQuestion = (questionId: number, newValue: string) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.qId === questionId
          ? { ...question, question: newValue }
          : question
      )
    );
  };

  const deleteQuestion = (questionId: number) => {
    if (questions.length < 2) return;
    setQuestions((prev) =>
      prev
        .filter((question) => question.qId !== questionId)
        .map((question, index) => ({ ...question, id: index + 1 }))
    );
  };

  const modifyAnswer = (
    questionId: number,
    answerId: number,
    newValue: string
  ) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.qId === questionId
          ? {
              ...question,
              answers: question.answers.map((answer) =>
                answer.aId === answerId
                  ? { ...answer, answer: newValue }
                  : answer
              ),
            }
          : question
      )
    );
  };

  const modifyIsCorrect = (questionId: number, answerId: number) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.qId === questionId
          ? {
              ...question,
              answers: question.answers.map((answer) =>
                answer.aId === answerId
                  ? { ...answer, isCorrect: !answer.isCorrect }
                  : answer
              ),
            }
          : question
      )
    );
  };

  const addAnswer = (questionId: number) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.qId === questionId
          ? {
              ...question,
              answers: [
                ...question.answers,
                {
                  aId: question.answers.length + 1,
                  answer: '',
                  isCorrect: false,
                },
              ],
            }
          : question
      )
    );
  };

  const deleteAnswer = (questionId: number, answerId: number) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.qId === questionId
          ? {
              ...question,
              answers: question.answers
                .filter((answer) => answer.aId !== answerId)
                .map((answer, index) => ({ ...answer, aId: index + 1 })),
            }
          : question
      )
    );
  };

  const saveTest = async () => {
    const { isValid, errorMessage } = validateTest(questions, testName);
    if (!isValid) {
      setErrorSend(errorMessage);
      setQuestions((prev) => {
        return prev.map((question) => ({
          ...question,
          isValid: validateQuestion(question),
        }));
      });
      return;
    }

    setIsLoading(true);
    const questionsToSend = transformQuestions(questions);

    try {
      onSave(testName, auth!.userId, questionsToSend);
    } catch (err) {
      setErrorSend(
        'An error occurred while saving the test. Please try again later.'
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container sx={{ py: 4, overflowY: 'auto' }}>
      <Box mb={2}>
        <TextField
          label="Test Name"
          fullWidth
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          variant="outlined"
          error={!!errorSend}
          helperText={errorSend}
        />
      </Box>
      <Grid2 container spacing={2}>
        {questions.map((question) => (
          <Grid2 key={question.qId} size={6}>
            <SingleQuestion
              question={question}
              questionChange={modifyQuestion}
              answerChange={modifyAnswer}
              correctChange={modifyIsCorrect}
              deleteQuestion={deleteQuestion}
              addAnswer={addAnswer}
              deleteAnswer={deleteAnswer}
            />
          </Grid2>
        ))}
      </Grid2>
      <Box
        mt={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          variant="contained"
          onClick={addQuestion}
          disabled={questions.length >= 40}
        >
          Add Question
        </Button>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" color="primary" onClick={saveTest}>
            Save Test
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default GeneralTest;
