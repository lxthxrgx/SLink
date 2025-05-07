import { SQLiteDatabase, openDatabaseSync, SQLiteProvider } from 'expo-sqlite';
import { Drawer } from 'expo-router/drawer';
import { Stack } from 'expo-router';
import { useEffect, useState} from 'react';
import { useFonts } from 'expo-font';

export default function Layout() {
  const [db, setDb] = useState<SQLiteDatabase | null>(null);

  useEffect(() => {
    const database = openDatabaseSync('test.db');
    setDb(database);

    (async () => {
      //console.log("Creating Database if needed");
      try {
        // console.log("🧹 Dropping table department if exists...");
        // await database.execAsync(`DROP TABLE IF EXISTS department`);
        // console.log("✅ Table dropped");

        await database.execAsync(
          `CREATE TABLE IF NOT EXISTS department (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            num INT,
            anydesk INT,
            \`limit\` REAL);`
        );
      } catch (error) {
        //console.error("Error creating table: ", error);
      }
    })();
  }, []);


  return (
    <SQLiteProvider databaseName="test.db">
     <Stack />
    </SQLiteProvider>

  );
}

