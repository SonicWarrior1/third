import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './navigators/AuthNavigator';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}

export default App;
