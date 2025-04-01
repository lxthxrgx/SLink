import { Image, StyleSheet, Platform, Text } from 'react-native';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSQLiteContext } from 'expo-sqlite';
import { useFocusEffect } from 'expo-router';

type Departmetn = {id: number, num:number, anydesk:string, limit:number}

const [data, setData] = useState<Departmetn[]>([]);

const database = useSQLiteContext();

const LoadData = async () => {
  const result = await database.getAllAsync<Departmetn>("Select * from department;")
  setData(result);
}

useFocusEffect(
  useCallback(()=> {
    LoadData();
  }, [])
);

export default function HomeScreen() {
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
