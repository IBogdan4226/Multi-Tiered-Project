import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../App';
import { Student, TestDTO } from '../types/Question';
import useAxiosPrivate from './useAxiosSelfRefresh';
import { useCancelToken } from './useCancelToken';

export const useStudentActions = () => {
  const axiosPrivate = useAxiosPrivate();
  const cancelToken = useCancelToken();

  const navigate = useNavigate();
  const location = useLocation();
  const _getStudents = useCallback(
    async (filterName: string, filterGroup: string) => {
      try {
        const response = await axiosPrivate.get<Student[]>(
          `/student?studentName=${filterName}&groupName=${filterGroup}`,
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

  const _getStudent = useCallback(
    async (studentId: string) => {
      try {
        const response = await axiosPrivate.get<TestDTO>(
          `/student/${studentId}`,
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

  const _saveStudent = useCallback(async (name: string, group: string) => {
    return axiosPrivate.post(
      'student',
      JSON.stringify({
        name,
        group,
      })
    );
  }, []);

  const _updateStudent = useCallback(
    async (studentId: string, name: string, group: string) => {
      return axiosPrivate.put(
        `student/${studentId}`,
        JSON.stringify({
          name,
          group,
        })
      );
    },
    []
  );

  return { _getStudent, _getStudents, _saveStudent, _updateStudent };
};
