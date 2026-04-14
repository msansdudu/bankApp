import { apiRequest } from '../../shared/api/apiService';

export const getTransactionsByUserId = (userId) => {
    return apiRequest(`/transactions/user/${userId}`);
};
