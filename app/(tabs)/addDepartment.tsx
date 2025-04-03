import { useCallback, useState } from "react"
import Department from "../../model/Department"
import { useSQLiteContext } from "expo-sqlite";
import { useFocusEffect } from "expo-router";
import { SafeAreaFrameContext } from "react-native-safe-area-context";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from "react-native";

export default function AddDepartment()
{
    const[data, setData] = useState<Department[]>([]);
    const db = useSQLiteContext();

    // useFocusEffect(() => {
    //     useCallback(() => {
    //     try{
    //         const SetData = async () => {
    //             const entity = await db.runAsync("INSERT INTO department (num, anydesk) VALUES (? , ?);", num, anydesk);
    //         }

    //         SetData();
    //     }catch(error)
    //     {
    //         console.log("Error when trying to add date to db: " + error)
    //     }
    //     }, [db])
    // })

    return(
        <SafeAreaView>
            <TextInput placeholder="Номер">

            </TextInput>

            <TextInput placeholder="Anydesk">

            </TextInput>


        </SafeAreaView>
    );

}   