import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  QuestionDTO,
  StudentGradeDTO,
  StudentGradeLightDTO,
  TestDTO,
  TestPreviewDTO,
} from '../types/Question';
import useAxiosPrivate from './useAxiosSelfRefresh';
import { useCancelToken } from './useCancelToken';
import { AppRoute } from '../App';

export const useTestActions = () => {
  const axiosPrivate = useAxiosPrivate();
  const cancelToken = useCancelToken();

  const navigate = useNavigate();
  const location = useLocation();
  const _getTests = useCallback(
    async (filterName: string) => {
      try {
        const response = await axiosPrivate.get<TestPreviewDTO[]>(
          `/test?testName=${filterName}`,
          {
            cancelToken: cancelToken,
          }
        );
        return response.data;
      } catch (err: any) {
        console.error(err);
        if (err.status === 403) {
          navigate(AppRoute.LOGIN, {
            state: { from: location },
            replace: true,
          });
        }
      }
    },
    [axiosPrivate]
  );

  const _getTest = useCallback(
    async (testId: string) => {
      try {
        const response = await axiosPrivate.get<TestDTO>(`/test/${testId}`, {
          cancelToken: cancelToken,
        });
        return response.data;
      } catch (err: any) {
        console.error(err);
        if (err.status === 403) {
          navigate(AppRoute.LOGIN, {
            state: { from: location },
            replace: true,
          });
        }
      }
    },
    [axiosPrivate]
  );

  const _saveTest = useCallback(
    async (testName: string, teacherId: string, questions: QuestionDTO[]) => {
      return axiosPrivate.post(
        'test',
        JSON.stringify({
          testName,
          teacherId: teacherId,
          questions: questions,
        })
      );
    },
    []
  );

  const _updateTest = useCallback(
    async (
      testId: string,
      testName: string,
      teacherId: string,
      questions: QuestionDTO[]
    ) => {
      return axiosPrivate.put(
        `test/${testId}`,
        JSON.stringify({
          testName,
          teacherId: teacherId,
          questions: questions,
        })
      );
    },
    []
  );

  const _saveStudentToTest = useCallback(
    async (
      testId: string,
      studentId: string,
      grade: number,
      note: string,
      photo: string | null
    ) => {
      return axiosPrivate.post(
        `test/${testId}/student/${studentId}`,
        JSON.stringify({
          grade,
          note,
          photo,
        })
      );
    },
    []
  );

  const _getStudentsFromTest = useCallback(async (testId: string) => {
    return axiosPrivate.get<StudentGradeLightDTO[]>(`test/${testId}/students`);
  }, []);

  const _getStudentFromTest = useCallback(async (testStudentId: string) => {
    return axiosPrivate.get<StudentGradeDTO>(`test-student/${testStudentId}`);
  }, []);

  const _updateStudentFromTest = useCallback(
    async (testStudentId: string, note: string, grade: number) => {
      return axiosPrivate.put<StudentGradeDTO>(
        `test-student/${testStudentId}`,
        JSON.stringify({
          note,
          grade,
        })
      );
    },
    []
  );

  return {
    _getTests,
    _saveTest,
    _updateTest,
    _getTest,
    _saveStudentToTest,
    _getStudentsFromTest,
    _getStudentFromTest,
    _updateStudentFromTest
  };
};
