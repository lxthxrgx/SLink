import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { View, Text, FlatList } from "react-native";

type Department = { id: number; num: number; anydesk: string; limit: number };

export default function Department()
{
    const [data, setData] = useState<Department[]>([]);
    const db = useSQLiteContext();

    useFocusEffect(() => {
        useCallback(() => {
            const LoadData =  async () => {
                const result = await db.getAllAsync<Department>("SELECT * FROM department;");
                setData(result);
            }

            LoadData();
        },[db]);
    });
    


    return(
    <View >
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