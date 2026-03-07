import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services';

export const useAxiosErrorHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      response => response,
      error => {
        // Don't redirect on aborted requests (cancelled by AbortController)
        if (error.name !== 'CanceledError' && error.code !== 'ERR_CANCELED') {
          navigate('/500', { replace: true });
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on unmount
    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [navigate]);
};
