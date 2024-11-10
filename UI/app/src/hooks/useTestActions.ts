import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QuestionDTO, TestPreviewDTO } from '../types/Question';
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

  return { _getTests, _saveTest };
};
