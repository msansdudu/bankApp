import api from '../../../shared/api/apiService';

export const getNotificationsByUserId = async (userId) => {
  try {
    const response = await api.get(`/notifications/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении списка уведомлений пользователя ${userId}:`, error.response?.data || error.message);
    throw error;
  }
};

export const markNotificationAsRead = async (id) => {
  try {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка при отметке уведомления ${id} прочитанным:`, error.response?.data || error.message);
    throw error;
  }
};
