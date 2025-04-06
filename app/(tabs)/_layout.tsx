import { createDrawerNavigator } from '@react-navigation/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { SQLiteDatabase, openDatabaseSync, SQLiteProvider } from 'expo-sqlite';

import HomeScreen from '../index';
import AddDepartment from '../(tabs)/AddDepartment';

const Drawer = createDrawerNavigator();
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [db, setDb] = useState<SQLiteDatabase | null>(null);

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
            limit REAL);
          `
        );
      } catch (error) {
        console.error("Error creating table: ", error);
      }
    })();
  }, []);

  return (
    <SQLiteProvider databaseName="test.db">
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Add Department" component={AddDepartment} />
      </Drawer.Navigator>
    </SQLiteProvider>
  );
}
