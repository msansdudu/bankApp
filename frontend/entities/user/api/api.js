import { apiRequest } from '../../../shared/api/apiService';

export const getUserById = (userId) => {
  return apiRequest(`/users/${userId}`);
};
