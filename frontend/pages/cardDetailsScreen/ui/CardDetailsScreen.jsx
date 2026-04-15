import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../shared/lib/themes/ThemeContext';
import BankCard from '../../../entities/bankCard';
import { formatAccountNumber } from '../../../shared/lib/utils/format';

export default function CardDetailsScreen({ route, navigation }) {
    const { account } = route.params;
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.cardContainer}>
                    <BankCard
                        cardType={account.accountType}
                        cardNumber={account.accountNumber}
                        cardOrder="MIR"
                        balance={`${account.balance} ${account.currency}`}
                        theme={theme}
                    />
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.sectionTitle}>Детали счета</Text>

                    <DetailItem
                        label="Номер счета"
                        value={formatAccountNumber(account.accountNumber)}
                        theme={theme}
                        icon="card-outline"
                    />
                    <DetailItem
                        label="Тип счета"
                        value={account.accountType}
                        theme={theme}
                        icon="list-outline"
                    />
                    <DetailItem
                        label="Валюта"
                        value={account.currency}
                        theme={theme}
                        icon="cash-outline"
                    />
                    <DetailItem
                        label="Доступный остаток"
                        value={`${account.balance} ${account.currency}`}
                        theme={theme}
                        icon="wallet-outline"
                    />
                </View>

                <TouchableOpacity
                    style={styles.transferButton}
                    onPress={() => navigation.navigate('TransferMoney', { sourceAccount: account })}
                >
                    <Ionicons name="swap-horizontal" size={24} color={theme.background} />
                    <Text style={styles.transferButtonText}>Перевести деньги</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.secondaryButtonText}>Назад</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const DetailItem = ({ label, value, theme, icon }) => (
    <View style={detailStyles(theme).item}>
        <View style={detailStyles(theme).iconContainer}>
            <Ionicons name={icon} size={20} color={theme.primary} />
        </View>
        <View style={detailStyles(theme).textContainer}>
            <Text style={detailStyles(theme).label}>{label}</Text>
            <Text style={detailStyles(theme).value}>{value}</Text>
        </View>
    </View>
);

const detailStyles = (theme) => StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: theme.outline,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    label: {
        fontSize: 12,
        color: theme.textSecondary,
        marginBottom: 2,
    },
    value: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.text,
    },
});

const createStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    scrollContent: {
        padding: 20,
    },
    cardContainer: {
        alignItems: 'center',
        marginVertical: 20,
        shadowColor: theme.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 10,
    },
    detailsContainer: {
        backgroundColor: theme.card,
        borderRadius: 20,
        padding: 20,
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.text,
        marginBottom: 15,
    },
    transferButton: {
        backgroundColor: theme.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        borderRadius: 15,
        marginBottom: 15,
        shadowColor: theme.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    transferButtonText: {
        color: theme.background,
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    secondaryButton: {
        alignItems: 'center',
        padding: 15,
    },
    secondaryButtonText: {
        color: theme.textSecondary,
        fontSize: 16,
    },
});
