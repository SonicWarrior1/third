import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import AllUsers from '../screens/all_users';
import {
  BottomTabParamList,
  NAVIGATION,
} from '../constants/navigation';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false, tabBarActiveTintColor: 'orange'}}
      backBehavior="firstRoute">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name={NAVIGATION.TABS.USERS} component={AllUsers} />
    </Tab.Navigator>
  );
};
export default AppNavigator;
