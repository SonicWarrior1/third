import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  BottomTabParamList,
  DrawerParamList,
  NAVIGATION,
} from '../constants/navigation';
import AllUsers from '../screens/all_users';
import Home from '../screens/home';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import SettingScreen from '../screens/settings';
import {ICONS} from '../constants/icons';
import Todo from '../screens/Todo';
import Products from '../screens/Products';
import {useAppSelector} from '../Redux/Store';
import PokeDex from '../screens/pokedex';
import CustomTabBar from '../components/CustomBottomTab';

function CustomDrawerContent(props: Readonly<DrawerContentComponentProps>) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close"
        onPress={() => {
          props.navigation.closeDrawer();
        }}
      />
    </DrawerContentScrollView>
  );
}
const Drawer = createDrawerNavigator<DrawerParamList>();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => CustomDrawerContent(props)}
      screenOptions={{
        drawerActiveTintColor: 'orange',
        // drawerPosition: 'right',
        drawerType: 'front',
      }}>
      <Drawer.Screen name={NAVIGATION.TABS.DRAWER.HOME} component={Home} />
      <Drawer.Screen
        name={NAVIGATION.TABS.DRAWER.SETTINGS}
        component={SettingScreen}
      />
    </Drawer.Navigator>
  );
};

const Tab = createBottomTabNavigator<BottomTabParamList>();
const AppNavigator = () => {
  const todos = useAppSelector(state => state.todo.todos);
  const allUser = useAppSelector(state => state.user.allUser);

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false, tabBarActiveTintColor: 'orange'}}
      tabBar={CustomTabBar}
      backBehavior="firstRoute">
      <Tab.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({focused, color, size}) =>
            ICONS.HOME({width: size, height: size, color: 'black'}),
        }}
      />
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          tabBarIcon: ({focused, color, size}) =>
            ICONS.Shopping({
              width: size,
              height: size,
              color: color,
            }),
        }}
      />
      <Tab.Screen
        name="PokeDex"
        component={PokeDex}
        options={{
          tabBarIcon: ({focused, color, size}) =>
            ICONS.Pokemon({
              width: size,
              height: size,
              color: color,
            }),
        }}
      />
      <Tab.Screen
        name="Todo"
        component={Todo}
        options={{
          tabBarIcon: ({focused, color, size}) =>
            ICONS.Todo({
              width: size,
              height: size,
              color: color,
            }),
          tabBarBadgeStyle: {backgroundColor: 'green'},
          tabBarBadge: todos.length === 0 ? undefined : todos.length,
        }}
      />
      <Tab.Screen
        name={NAVIGATION.TABS.USERS}
        component={AllUsers}
        options={{
          tabBarIcon: ({focused, color, size}) =>
            ICONS.USERS({
              width: size,
              height: size,
              color: 'white',
            }),
          tabBarBadge: Object.values(allUser).length,
        }}
      />
    </Tab.Navigator>
  );
};
export default AppNavigator;
