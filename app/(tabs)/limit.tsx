import { useState } from "react";
import { SafeAreaView, TextInput, Button, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Limit() {
  const [selectedValue, setSelectedValue] = useState<number>(1);
  const [limit, setLimit] = useState<string>("");

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, margin: 20 }}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        style={{ height: 50, width: 150 }}
      >
        {[1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((num) => (
          <Picker.Item key={num} label={String(num)} value={num} />
        ))}
      </Picker>

      <TextInput
        placeholder="Ліміт..."
        value={limit}
        onChangeText={setLimit}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
      />

      <Button title="Зберегти" onPress={() => console.log("Saved:", selectedValue, limit)} />
    </SafeAreaView>
  );
}
