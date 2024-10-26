import axios from 'axios';
import { useEffect, useMemo } from 'react';

export const getCancelToken = () => {
  return axios.CancelToken.source();
};

export const useCancelToken = () => {
  const source = useMemo(() => {
    return getCancelToken();
  }, []);

  useEffect(() => {
    return () => {
      source && source.cancel('Request canceled by unmount.');
    };
  }, []);
  return source.token;
};
