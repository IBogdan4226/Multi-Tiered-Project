import { AppRoute } from 'app/src/App';
import { useTestActions } from 'app/src/hooks/useTestActions';
import { QuestionDTO } from 'app/src/types/Question';
import { useNavigate } from 'react-router-dom';
import GeneralTest from '../GeneralTest/GeneralTest';
import { templateQuestion } from '../GeneralTest/GeneralTest.utils';

const CreateTestPage = () => {
  const { _saveTest } = useTestActions();
  const navigate = useNavigate();

  const saveTest = async (
    testName: string,
    teacherId: string,
    questions: QuestionDTO[]
  ) => {
    await _saveTest(testName, teacherId, questions);
    navigate(AppRoute.TESTS, { replace: true });
  };

  return (
    <GeneralTest
      testNameProp=""
      initialQuestions={templateQuestion}
      onSave={saveTest}
    />
  );
};

export default CreateTestPage;
