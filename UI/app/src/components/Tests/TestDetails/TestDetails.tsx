import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTestActions } from 'app/src/hooks/useTestActions';
import { QuestionDTO } from 'app/src/types/Question';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import BubbleSheetComponent from '../TestDownloadables/BubbleSheetComponent';
import QuestionSheetComponent from '../TestDownloadables/QuestionSheetComponent';

const TestDetails = () => {
  const [questions, setQuestions] = useState<QuestionDTO[]>([]);
  const [testName, setTestName] = useState<string>('');
  const { _getTest } = useTestActions();
  const { testId } = useParams();
  const questionTestRef = useRef<HTMLDivElement>(null);
  const bubbleTestRef = useRef<HTMLDivElement>(null);
  const reactToPrintTestFn = useReactToPrint({ contentRef: questionTestRef });
  const reactToPrintBubbleFn = useReactToPrint({ contentRef: bubbleTestRef });

  useEffect(() => {
    getTest(testId);
  }, [testId]);

  const getTest = async (testId: string | undefined) => {
    if (!testId) return;
    const res = await _getTest(testId);

    if (res) {
      setTestName(res.testName);
      setQuestions(res.questions);
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        padding: 2,
        overflowY: 'auto',
      }}
    >
      <Accordion sx={{ marginBottom: 3 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            borderRadius: 1,
            cursor: 'pointer',
          }}
        >
          <Typography
            sx={{
              marginLeft: 1,
              fontWeight: 'bold',
              flex: 1,
            }}
          >
            See test questions and answers.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              reactToPrintTestFn();
            }}
          >
            Download!
          </Button>
        </AccordionSummary>
        <AccordionDetails>
          <Box ref={questionTestRef}>
            <QuestionSheetComponent title={testName} questions={questions} />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            borderRadius: 1,
            cursor: 'pointer',
          }}
        >
          <Typography
            sx={{
              marginLeft: 1,
              fontWeight: 'bold',
              flex: 1,
            }}
          >
            See bubble sheet quiz.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              reactToPrintBubbleFn();
            }}
          >
            Download!
          </Button>
        </AccordionSummary>
        <AccordionDetails>
          <Box ref={bubbleTestRef}>
            <BubbleSheetComponent
              id={testId!}
              title={testName}
              noQuestions={questions?.length}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default TestDetails;
