import { ExtendedQuestionDTO, QuestionDTO } from 'app/src/types/Question';

export const transformQuestions = (
  questions: ExtendedQuestionDTO[]
): QuestionDTO[] => {
  return questions.map((q) => ({
    qId: q.qId,
    question: q.question,
    answers: q.answers.map((a) => ({
      aId: a.aId,
      answer: a.answer,
      isCorrect: a.isCorrect,
    })),
  }));
};

export const validateQuestion = (question: ExtendedQuestionDTO): boolean => {
  const hasCorrectAnswer = question.answers.some((answer) => answer.isCorrect);
  const hasIncorrectAnswer = question.answers.some(
    (answer) => !answer.isCorrect
  );
  const isInvalidQuestion =
    question.question.length < 10 || question.question.split(' ').length < 3;
  const isInvalidAnswer = question.answers.some(
    (answer) => answer.answer.length < 1
  );

  return (
    !isInvalidQuestion &&
    !isInvalidAnswer &&
    hasCorrectAnswer &&
    hasIncorrectAnswer
  );
};

export const validateTestName = (testName: string): boolean => {
  return (
    testName.length > 4 &&
    testName.length < 50 &&
    !/[;'"<>&\\\/]/.test(testName)
  );
};

export const validateTest = (
  questions: ExtendedQuestionDTO[],
  testName: string
): { isValid: boolean; errorMessage: string } => {
  const updatedQuestions = questions.map((question) => ({
    ...question,
    isValid: validateQuestion(question),
  }));

  const validName = validateTestName(testName);
  const hasEnoughQuestions = questions.length >= 3;
  const hasInvalidQuestion = updatedQuestions.some(
    (question) => !question.isValid
  );

  if (!validName) {
    return {
      isValid: false,
      errorMessage:
        'Please provide a valid test name that is between 5 and 50 characters!',
    };
  }
  if (hasInvalidQuestion) {
    return {
      isValid: false,
      errorMessage: 'Please ensure all questions and answers are valid!',
    };
  }
  if (!hasEnoughQuestions) {
    return {
      isValid: false,
      errorMessage: 'Please provide a test with at least 3 questions!',
    };
  }

  return { isValid: true, errorMessage: '' };
};

export const templateQuestion: ExtendedQuestionDTO[] = [
  {
    qId: 1,
    question: '',
    answers: [
      { aId: 1, answer: '', isCorrect: false },
      { aId: 2, answer: '', isCorrect: false },
      { aId: 3, answer: '', isCorrect: false },
      { aId: 4, answer: '', isCorrect: false },
    ],
    isValid: true,
  },
  {
    qId: 2,
    question: '',
    answers: [
      { aId: 1, answer: '', isCorrect: false },
      { aId: 2, answer: '', isCorrect: false },
      { aId: 3, answer: '', isCorrect: false },
      { aId: 4, answer: '', isCorrect: false },
    ],
    isValid: true,
  },
  {
    qId: 3,
    question: '',
    answers: [
      { aId: 1, answer: '', isCorrect: false },
      { aId: 2, answer: '', isCorrect: false },
      { aId: 3, answer: '', isCorrect: false },
      { aId: 4, answer: '', isCorrect: false },
    ],
    isValid: true,
  },
  {
    qId: 4,
    question: '',
    answers: [
      { aId: 1, answer: '', isCorrect: false },
      { aId: 2, answer: '', isCorrect: false },
      { aId: 3, answer: '', isCorrect: false },
      { aId: 4, answer: '', isCorrect: false },
    ],
    isValid: true,
  },
  {
    qId: 5,
    question: '',
    answers: [
      { aId: 1, answer: '', isCorrect: false },
      { aId: 2, answer: '', isCorrect: false },
      { aId: 3, answer: '', isCorrect: false },
      { aId: 4, answer: '', isCorrect: false },
    ],
    isValid: true,
  },
  {
    qId: 6,
    question: '',
    answers: [
      { aId: 1, answer: '', isCorrect: false },
      { aId: 2, answer: '', isCorrect: false },
      { aId: 3, answer: '', isCorrect: false },
      { aId: 4, answer: '', isCorrect: false },
    ],
    isValid: true,
  },
  {
    qId: 7,
    question: '',
    answers: [
      { aId: 1, answer: '', isCorrect: false },
      { aId: 2, answer: '', isCorrect: false },
      { aId: 3, answer: '', isCorrect: false },
      { aId: 4, answer: '', isCorrect: false },
    ],
    isValid: true,
  },
  {
    qId: 8,
    question: '',
    answers: [
      { aId: 1, answer: '', isCorrect: false },
      { aId: 2, answer: '', isCorrect: false },
      { aId: 3, answer: '', isCorrect: false },
      { aId: 4, answer: '', isCorrect: false },
    ],
    isValid: true,
  },
  {
    qId: 9,
    question: '',
    answers: [
      { aId: 1, answer: '', isCorrect: false },
      { aId: 2, answer: '', isCorrect: false },
      { aId: 3, answer: '', isCorrect: false },
      { aId: 4, answer: '', isCorrect: false },
    ],
    isValid: true,
  },
  {
    qId: 10,
    question: '',
    answers: [
      { aId: 1, answer: '', isCorrect: false },
      { aId: 2, answer: '', isCorrect: false },
      { aId: 3, answer: '', isCorrect: false },
      { aId: 4, answer: '', isCorrect: false },
    ],
    isValid: true,
  },
];
