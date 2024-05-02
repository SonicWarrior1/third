import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './navigators/AuthNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState, createContext} from 'react';
import User from './interfaces/user_interface';
import AppNavigator from './navigators/AppNavigator';

const LoginContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => {});

function App(): React.JSX.Element {
  const [isLoggedIn, setLogIn] = useState(false);
  async function getLoginStatus() {
    const user = await AsyncStorage.getItem('currentUser');
    if (user) {
      setLogIn(true);
      console.log('true');
    } else {
      setLogIn(false);
      console.log('false');
    }
  }
  useEffect(() => {
    getLoginStatus();
  }, []);
  return (
    <LoginContext.Provider value={setLogIn}>
      <NavigationContainer>
        {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </LoginContext.Provider>
  );
}

export default App;
export {LoginContext};
