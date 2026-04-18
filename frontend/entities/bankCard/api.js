import api from '../../shared/api/apiService';

export const getAccountsByUserId = async (userId) => {
    try {
        const response = await api.get(`/accounts/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Ошибка при получении списка счетов пользователя ${userId}:`, error.response?.data || error.message);
        throw error;
    }
};

export const getAccountByNumber = async (accountNumber) => {
    try {
        const response = await api.get(`/accounts/${accountNumber}`);
        return response.data;
    } catch (error) {
        console.error(`Ошибка при поиске счета ${accountNumber}:`, error.response?.data || error.message);
        throw error;
    }
};

export const createAccount = async (data) => {
    try {
        const response = await api.post('/accounts/create-random', data);
        return response.data;
    } catch (error) {
        console.error('Ошибка при создании счета:', error.response?.data || error.message);
        throw error;
    }
};

// TODO создание счета:
// export const createAccount = (data) => apiRequest('/accounts/create', { method: 'POST', body: JSON.stringify(data) });
