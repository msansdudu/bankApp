import { apiRequest } from '../../shared/api/apiService';

export const getAccountsByUserId = (userId) => {
    return apiRequest(`/accounts/user/${userId}`);
};

// В будущем здесь можно будет добавить создание счета:
// export const createAccount = (data) => apiRequest('/accounts/create', { method: 'POST', body: JSON.stringify(data) });
