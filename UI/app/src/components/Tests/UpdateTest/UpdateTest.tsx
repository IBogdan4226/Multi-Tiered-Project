import { AppRoute } from 'app/src/App';
import { useTestActions } from 'app/src/hooks/useTestActions';
import { ExtendedQuestionDTO, QuestionDTO } from 'app/src/types/Question';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GeneralTest from '../GeneralTest/GeneralTest';

const UpdateTestPage = () => {
  const { _updateTest, _getTest } = useTestActions();
  const navigate = useNavigate();
  const { testId } = useParams();
  const [initialTestName, setInitialTestName] = useState('');
  const [initialQuestions, setInitialQuestions] = useState<
    ExtendedQuestionDTO[]
  >([]);

  useEffect(() => {
    getTest(testId);
  }, [testId]);

  const getTest = async (testId: string | undefined) => {
    if (!testId) return;
    const res = await _getTest(testId);

    if (res) {
      setInitialTestName(res.testName);
      setInitialQuestions(res.questions.map((q) => ({ ...q, isValid: true })));
    }
  };

  const updateTest = async (
    testName: string,
    teacherId: string,
    questions: QuestionDTO[]
  ) => {
    await _updateTest(testId!, testName, teacherId, questions);
    navigate(AppRoute.TESTS, { replace: true });
  };

  return (
    <GeneralTest
      testNameProp={initialTestName}
      initialQuestions={initialQuestions}
      onSave={updateTest}
    />
  );
};

export default UpdateTestPage;
