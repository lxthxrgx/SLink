import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './(tabs)';
import Limit from './(tabs)/limit';

const Drawer = createDrawerNavigator();

export default function DrawerLayout() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={Limit} />
    </Drawer.Navigator>
  );
}
