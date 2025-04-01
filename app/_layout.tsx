import { useFonts } from 'expo-font';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { SQLiteDatabase, openDatabaseSync } from 'expo-sqlite';

import HomeScreen from './(tabs)';
import Limit from './(tabs)/limit';

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

    const createDbIfNeeded = async (db: SQLiteDatabase) => {
      console.log("Creating Database if needed");
      try {
        await db.execAsync(
          `CREATE TABLE IF NOT EXISTS department (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            num INT,
            anydesk TEXT,
            \`limit\` REAL);`
        );
      } catch (error) {
        console.error("Error creating table: ", error);
      }
    };
    
    createDbIfNeeded(database);
  }, [loaded]);

  if (!loaded || !db) {
    return null;
  }

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={Limit} />
    </Drawer.Navigator>
  );
}
