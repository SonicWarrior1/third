import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './navigators/AuthNavigator';
import {enableFreeze, enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import store, { persistor } from './Redux/Store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
enableFreeze(true);
enableScreens(false);
function App(): React.JSX.Element {
 
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
      <PersistGate persistor={persistor}>

        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
