import { SQLiteDatabase, openDatabaseSync, SQLiteProvider } from 'expo-sqlite';
import { Stack } from 'expo-router/stack';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <SQLiteProvider databaseName="test.db">
      <Drawer>
            <Drawer.Screen
              name="index"
              options={{
                drawerLabel: 'Home',
                title: 'Home',
              }}
            />
            <Drawer.Screen
              name="(tabs)/AddDepartment"
              options={{
                drawerLabel: 'Add Department',
                title: 'Add Department',
              }}
            />
          </Drawer>
    </SQLiteProvider>

  );
}

