import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/login';
import Signup from '../screens/signup';
import AppNavigator from './AppNavigator';
import {NAVIGATION, RootStackParamList} from '../constants/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerBlurEffect: 'dark',
        headerTitleStyle: {color: 'white'},
      }}>
      <Stack.Screen name={NAVIGATION.LOGIN} component={Login} />
      <Stack.Screen name={NAVIGATION.SIGNUP} component={Signup} />
      <Stack.Screen
        name={NAVIGATION.APP}
        component={AppNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
