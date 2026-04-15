import api from '../../../shared/api/apiService';

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении пользователя ${userId}:`, error.response?.data || error.message);
    throw error;
  }
};