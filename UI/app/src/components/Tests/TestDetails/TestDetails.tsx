import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useStudentActions } from 'app/src/hooks/useStudentActions';
import { useTestActions } from 'app/src/hooks/useTestActions';
import { QuestionDTO } from 'app/src/types/Question';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import BubbleSheetComponent from '../TestDownloadables/BubbleSheetComponent';
import QuestionSheetComponent from '../TestDownloadables/QuestionSheetComponent';
import { TestStudentModal } from '../TestStudentModal/TestStudentModal';

type StudentLabel = {
  id: string;
  name: string;
};

const TestDetails = () => {
  const [questions, setQuestions] = useState<QuestionDTO[]>([]);
  const [testName, setTestName] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [students, setStudents] = useState<StudentLabel[]>([]);
  const { _getTest, _saveStudentToTest } = useTestActions();
  const { _getStudents } = useStudentActions();
  const { testId } = useParams();
  const questionTestRef = useRef<HTMLDivElement>(null);
  const bubbleTestRef = useRef<HTMLDivElement>(null);
  const reactToPrintTestFn = useReactToPrint({ contentRef: questionTestRef });
  const reactToPrintBubbleFn = useReactToPrint({ contentRef: bubbleTestRef });

  useEffect(() => {
    getStudents();
  }, []);

  useEffect(() => {
    getTest(testId);
  }, [testId]);

  const getStudents = async () => {
    const res = await _getStudents('', '');
    if (res) {
      setStudents(
        res.map((student) => ({
          id: student.id,
          name: `${student.name} - ${student.group}`,
        }))
      );
    }
  };
  const getTest = async (testId: string | undefined) => {
    if (!testId) return;
    const res = await _getTest(testId);

    if (res) {
      setTestName(res.testName);
      setQuestions(res.questions);
    }
  };

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const handleSaveModal = async (
    studentId: string,
    grade: number,
    note: string,
    image: string | null
  ) => {
    setModalError(null);
    try {
      const res = await _saveStudentToTest(
        testId!,
        studentId,
        grade,
        note,
        image
      );
      if (res) {
        toggleModal();
      }
    } catch (e) {
      setModalError('Error saving student to test');
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
      <Button
        variant="contained"
        sx={{ marginBottom: 3 }}
        onClick={toggleModal}
      >
        Add Student to Test
      </Button>

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

      {isModalOpen && (
        <TestStudentModal
          onModalClose={toggleModal}
          isModalOpen={isModalOpen}
          students={students}
          onSave={handleSaveModal}
          error={modalError}
        />
      )}
    </Box>
  );
};

export default TestDetails;
