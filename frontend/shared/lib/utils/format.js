// Форматирует номер счета в виде 1111-2222-3333-4444
export const formatAccountNumber = (number) => {
    if (!number) return '';
    const cleanNumber = number.toString().replace(/\D/g, '');
    return cleanNumber.replace(/(\d{4})(?=\d)/g, '$1-');
};

// Удаляет форматирование из номера счета (оставляет только цифры)
export const stripAccountNumber = (formattedNumber) => {
    if (!formattedNumber) return '';
    return formattedNumber.replace(/-/g, '');
};
