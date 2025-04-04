import { Text, View, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { useCallback, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { useFocusEffect } from 'expo-router';

const backgroundImage = require("../assets/fonts/white.jpg");

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
    <ImageBackground source={backgroundImage} style={styles.stepContainer}>
      <View>
        <FlatList  showsVerticalScrollIndicator ={true}
          data={data}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text># {item.num}</Text>
              <Text>{item.anydesk}</Text>
            </View>
          )}
        />
      </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
    resizeMode: "cover",
  },
  card: {
    height: 60,
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 16,
    padding: 16,
    marginLeft:"auto",
    marginRight:"auto",
    justifyContent: 'space-between',
    flexDirection: "row",
    alignItems: 'center',
    opacity: 0.83
  },
});
