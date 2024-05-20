import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/login';
import Signup from '../screens/signup';
import AppNavigator from './AppNavigator';
import {NAVIGATION, RootStackParamList} from '../constants/navigation';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE} from '../constants/strings';
import ChangePass from '../screens/changePass';
import Billing from '../screens/billing';
import User from '../interfaces/user_interface';
import { useAppDispatch, useAppSelector} from '../Redux/Store';
import { setAllUser, setCurrentUser } from '../Redux/Reducers/userSlice';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  const dispatch = useAppDispatch();
  async function getUser() {
    const json = await AsyncStorage.getItem(STORAGE.CURRENTUSER);
    const all_users = await AsyncStorage.getItem(STORAGE.ALLUSERDATA);
    if (json && all_users) {
      const jsonVal: User = JSON.parse(json);
      const all_parsed: User[] = JSON.parse(all_users);
      dispatch(setCurrentUser(jsonVal));
      dispatch(setAllUser(all_parsed));
    } else {
      dispatch(setCurrentUser(undefined));
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  const user = useAppSelector(
    (state) => state.user.currentUser,
  );
  return (
    <Stack.Navigator>
      <>
        {user ? (
          <Stack.Screen
            name={NAVIGATION.APP}
            component={AppNavigator}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Group
            screenOptions={{
              headerStyle: {backgroundColor: 'rgb(55,55,55)'},
              headerTitleStyle: {color: 'white'},
            }}>
            <Stack.Screen name={NAVIGATION.LOGIN} component={Login} />
            <Stack.Screen name={NAVIGATION.SIGNUP} component={Signup} />
          </Stack.Group>
        )}
        <Stack.Screen name="changePass" component={ChangePass} />
        <Stack.Screen name="Billing" component={Billing} />
      </>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
