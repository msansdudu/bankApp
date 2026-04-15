import api from '../../shared/api/apiService';

export const getTransactionsByUserId = async (userId) => {
    try {
        const response = await api.get(`/transactions/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Ошибка при получении списка транзакций пользователя ${userId}:`, error.response?.data || error.message);
        throw error;
    }
};

export const transferMoney = async (transferData) => {
    try {
        const response = await api.post('/transactions', transferData);
        return response.data;
    } catch (error) {
        console.error('Ошибка при переводе средств:', error.response?.data || error.message);
        throw error;
    }
};