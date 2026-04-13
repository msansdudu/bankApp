import { FlatList, StyleSheet, View, Text } from 'react-native';
import OperationItem from '../../../entitites/operationItem';
import { useTheme } from '../../../shared/lib/themes/ThemeContext';

const mockOperations = [
  {
    id: '1',
    destination: 'Anastasia',
    sum: '₽200',
    operationType: 'money transfer',
    date: '21:30, 21.11.2025',
  },
  {
    id: '2',
    destination: 'Netflix',
    sum: '₽600',
    operationType: 'entertaiment',
    date: '19:21, 19.11.2025',
  },
  {
    id: '3',
    destination: 'Starbucks',
    sum: '₽520',
    operationType: 'cafe and restaurants',
    date: '10:13, 19.11.2025',
  },
  {
    id: '4',
    destination: 'Starbucks',
    sum: '₽520',
    operationType: 'cafe and restaurants',
    date: '10:09, 18.11.2025',
  },
  {
    id: '5',
    destination: 'Anastasia',
    sum: '₽100',
    operationType: 'money transfer',
    date: '21:20, 17.11.2025',
  },
];

export default function OperationsList() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View styles={styles.container}>
      <Text style={styles.title}>Траты</Text>
      <FlatList
        data={mockOperations}
        keyExtractor={(item) => item.id}
        vertical
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <OperationItem
            destination={item.destination}
            sum={item.sum}
            operationType={item.operationType}
            date={item.date}
            theme={theme}
          />
        )}
      />
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginVertical: 10,
    },
    title: {
      color: theme.text,
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.text,
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    listContent: {
      paddingVertical: 10,
    },
  });
