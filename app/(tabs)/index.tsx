import { Text, View, StyleSheet, FlatList } from 'react-native';
import { useCallback, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { useFocusEffect } from 'expo-router';

type Department = { id: number; num: number; anydesk: string; limit: number };

export default function HomeScreen() {
  const [data, setData] = useState<Department[]>([]);
  const database = useSQLiteContext();

  useFocusEffect(
    useCallback(() => {
      const LoadData = async () => {
        try {
          const result = await database.getAllAsync<Department>('SELECT * FROM department;');
          setData(result);
        } catch (error) {
          console.error('Database fetch error:', error);
        }
      };

      LoadData();

    }, [database])
  );

  return (
    <View style={styles.stepContainer}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View>
            <Text>{item.num}</Text>
            <Text>{item.anydesk}</Text>
            <Text>{item.limit}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
