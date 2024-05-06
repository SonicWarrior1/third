import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/login';
import Signup from '../screens/signup';
import AppNavigator from './AppNavigator';
import {NAVIGATION, RootStackParamList} from '../constants/navigation';
import {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE} from '../constants/strings';
import ChangePass from '../screens/changePass';
import Billing from '../screens/billing';
import FormikSignup from '../screens/formikSignup';
const LoginContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => {});
const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  const [isLoggedIn, setLogIn] = useState(false);
  async function getLoginStatus() {
    const user = await AsyncStorage.getItem(STORAGE.CURRENTUSER);
    if (user) {
      setLogIn(true);
    } else {
      setLogIn(false);
    }
  }
  useEffect(() => {
    getLoginStatus();
  }, []);
  return (
    <LoginContext.Provider value={setLogIn}>
      <Stack.Navigator screenOptions={{}}>
        <>
          {isLoggedIn ? (
            <Stack.Screen
              name={NAVIGATION.APP}
              component={AppNavigator}
              options={{headerShown: false,}}
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
    </LoginContext.Provider>
  );
};

export default AuthNavigator;
export {LoginContext};
