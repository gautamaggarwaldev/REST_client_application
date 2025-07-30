import { useQuery } from '@tanstack/react-query';
import { getHistory } from '../services/api';

export const useHistory = (page, limit) => {
  return useQuery({
    queryKey: ['history', page],
    queryFn: () => getHistory(page, limit),
    keepPreviousData: true,
  });
};