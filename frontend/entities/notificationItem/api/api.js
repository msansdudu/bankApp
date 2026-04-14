import { apiRequest } from '../../../shared/api/apiService';

export const getNotificationsByUserId = (userId) => {
  return apiRequest(`/notifications/user/${userId}`);
};

export const markNotificationAsRead = (id) => {
  return apiRequest(`/notifications/${id}/read`, { method: 'PUT' });
};
