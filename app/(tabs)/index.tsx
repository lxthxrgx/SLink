import { Text, View, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { useCallback, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { useFocusEffect, useRouter } from 'expo-router';

const backgroundImage = require("../../assets/fonts/white.jpg");

type Department = { id: number; num: number; anydesk: string; limit: number };

export default function HomeScreen() {
  const [data, setData] = useState<Department[]>([]);
  const database = SQLite.openDatabaseSync('test.db');
  const router = useRouter();
  
  useFocusEffect(
    useCallback(() => {
      const LoadData = async () => {
        try {
          const result = await database.getAllAsync<Department>('SELECT Id AS id, num, anydesk, "limit" FROM department;');
          setData(result);
        } catch (error) {
          //console.error('Database fetch error:', error);
        }
      };

      LoadData();

    }, [database])
  );

  return (
    <ImageBackground source={backgroundImage} style={styles.stepContainer}>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/(tabs)/AddDepartment")}>
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
        <FlatList 
          showsVerticalScrollIndicator={true}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                //console.log("Clicked item.id:", item.id);
                router.push(`/(tabs)/${item.id}`);
              }}
            >
              <Text># {item.num}</Text>
              <Text>{item.anydesk}</Text>
            </TouchableOpacity>
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
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: 'space-between',
    flexDirection: "row",
    alignItems: 'center',
    opacity: 0.83
  },
  button: {
    height: 60,
    margin: 16,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16
  }
});
