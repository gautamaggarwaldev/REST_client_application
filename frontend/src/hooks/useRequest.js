import { useMutation } from '@tanstack/react-query';
import { makeRequest } from '../services/api';

export const useMakeRequest = () => {
  return useMutation({
    mutationFn: makeRequest,
  });
};