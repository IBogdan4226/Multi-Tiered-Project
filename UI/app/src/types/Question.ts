export type TestPreviewDTO = {
  id: string;
  name: string;
};

export type TestDTO = {
  id: string;
  teacherId: string;
  testName: string;
  questions: QuestionDTO[];
};

export type QuestionDTO = {
  qId: number;
  question: string;
  answers: AnswerDTO[];
};

export type ExtendedQuestionDTO = QuestionDTO & {
  isValid: boolean;
};

export type AnswerDTO = {
  aId: number;
  answer: string;
  isCorrect: boolean;
};

export type Student = {
  id: string;
  name: string;
  group: string;
};

export type StudentGradeLightDTO = {
  id: string;
  grade: number;
  studentId: string;
  studentName: string;
  testId: string;
};

export type StudentGradeDTO = StudentGradeLightDTO & {
  testPhoto: string;
  note: string;
};
