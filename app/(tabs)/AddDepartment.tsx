import { useEffect, useState } from "react";
import Department from "../../model/Department";
import { useSQLiteContext } from "expo-sqlite";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button, View } from "react-native";

export default function AddDepartment() {
  const [data, setData] = useState<Department>({
    id: 0,
    num: 0,
    anydesk: 0,
    limit: 0,
  });

  const db = useSQLiteContext();

  async function SetToDB(num?: number, anydesk?: number) {
    if (num !== undefined && anydesk !== undefined) {
      try {
        await db.runAsync("INSERT INTO department (num, anydesk) VALUES (?, ?)", [
          num,
          anydesk,
        ]);
      } catch (error) {
        console.log("Error: " + error);
      }
    }
  }

  const handleChange = (field: keyof Department, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: Number(value) || 0,
    }));
  };

  return (
    <SafeAreaView>
      <View>
        <TextInput
          placeholder="Номер"
          value={data.num.toString()}
          onChangeText={(value) => handleChange("num", value)}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Anydesk"
          value={data.anydesk.toString()}
          onChangeText={(value) => handleChange("anydesk", value)}
          keyboardType="numeric"
        />

        <Button title="Зберегти" onPress={() => SetToDB(data.num, data.anydesk)} />
      </View>
    </SafeAreaView>
  );
}
