import { useLocalSearchParams } from "expo-router";
import { View, TextInput, Button } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import Department from "@/model/Department";
import { useEffect, useState } from "react";

import { Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";

const backgroundImage = require("../../assets/fonts/white.jpg");

export default function Edit() {
  const db = useSQLiteContext();
  const { id } = useLocalSearchParams(); 
  const [data, setData] = useState<Department | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const rawId = Array.isArray(id) ? id[0] : id;
      //console.log("raw id:", rawId);
      const numericId = Number(rawId);
      //console.log("numericId:", numericId);
  
      if (!isNaN(numericId)) {
        await GetDataFromDb(numericId);
      }
    };
    fetchData();
  }, [id]);
  

  async function GetDataFromDb(id: number): Promise<void> {
    try {
        //console.log(id)
        const dataFromDb = await db.getFirstAsync<any>(
            "SELECT Id as id, num, anydesk, `limit` FROM department WHERE Id = ?",
            [id]
          );
          

      if (dataFromDb) {
        //console.log("Fetched data from DB:", dataFromDb);
        setData({
          id: dataFromDb.id,
          num: dataFromDb.num,
          anydesk: dataFromDb.anydesk,
          limit: dataFromDb.limit,
        });
      } else {
        //console.log("No data found for id:", id);
      }
    } catch (error) {
      //console.error("Error when fetching data by id:", error);
    }
  }

  async function UpdateData() {
    try {
    //console.log("⏳ Updating data...");
      if (data) {
        await db.runAsync(
            'UPDATE department SET num = ?, anydesk = ?, `limit` = ? WHERE id = ?',
            [Number(data.num), Number(data.anydesk), Number(data.limit), Number(data.id)]
          );
          
        //console.log("✅ Update successful");
      } else {
        //console.log("⚠️ No data to update");
      }
    } catch (error) {
      //console.log("❌ Error when trying to update data:", error);
    }
  }
  

  const handleChange = (key: keyof Department, value: string) => {
    setData(prev => {
      if (!prev) return prev;
  
      let parsedValue: string | number = value;
  
      if (key !== "limit") {
        parsedValue = Number(value.replace(",", "."));
      }
  
      return {
        ...prev,
        [key]: parsedValue,
      };
    });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.stepContainer}>
        <View>
            <TextInput
                placeholder="Номер"
                value={data?.num.toString()}
                onChangeText={(value) => handleChange("num", value)}
                keyboardType="numeric"
            />

            <TextInput
                placeholder="Anydesk"
                value={data?.anydesk.toString()}
                onChangeText={(value) => handleChange("anydesk", value)}
            />

            <TextInput
                placeholder="Limit"
                value={data?.limit != null ? data.limit.toString() : ""}
                onChangeText={(value) => {
                    const sanitized = value.replace(/[^0-9.,]/g, "");
                    handleChange("limit", sanitized);
                }}
                keyboardType="numeric"
            />

            <TouchableOpacity  style={styles.button} onPress={UpdateData}>
                <Text style={styles.buttonText}>Зберегти</Text>
            </TouchableOpacity>
        
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