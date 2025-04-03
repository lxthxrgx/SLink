import { useFonts } from 'expo-font';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { SQLiteDatabase, openDatabaseSync, SQLiteProvider } from 'expo-sqlite';
import { router,Link, Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import HomeScreen from './index';
import Limit from './(tabs)/limit';
import AddDepartment from './(tabs)/addDepartment';

const Drawer = createDrawerNavigator();
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [db, setDb] = useState<SQLiteDatabase | null>(null);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const database = openDatabaseSync('test.db');
    setDb(database);

    (async () => {
      console.log("Creating Database if needed");
      try {
        await database.execAsync(
          `CREATE TABLE IF NOT EXISTS department (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            num INT,
            anydesk TEXT,
            \`limit\` REAL);`
        );
      } catch (error) {
        console.error("Error creating table: ", error);
      }
    })();
  }, [loaded]);

  if (!loaded || !db) {
    return null;
  }

  return (
    <SQLiteProvider databaseName="test.db">
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={Limit} />
        <Drawer.Screen name="Add Department" component={AddDepartment} />
      </Drawer.Navigator>
    </SQLiteProvider>
  );
}
