import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services';

export const useAxiosErrorHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      response => response,
      error => {
        navigate('/500', { replace: true });
        // Reject the promise so React Query can handle it
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on unmount
    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [navigate]);
};
