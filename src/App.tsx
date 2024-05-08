import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './navigators/AuthNavigator';
import {enableFreeze, enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import {store} from './Store';
enableFreeze(true);
enableScreens(false);
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
