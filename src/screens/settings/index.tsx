import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import {Button, Text} from 'react-native';

import {STORAGE} from '../../constants/strings';
import {LoginContext} from '../../navigators/AuthNavigator';
import DrawerView from '../../components/Drawer/drawerView';

const SettingScreen: ({route, navigation}) => React.JSX.Element = ({
  route,
  navigation,
}) => {
  const setIsLogIn = useContext(LoginContext);
  return (
    <DrawerView navigation={navigation}>
        <>
      <Button
        title="Change Password"
        onPress={async () => {
            navigation.push('changePass');
        }}></Button>
      <Button
        title="Signout"
        onPress={async () => {
            await AsyncStorage.removeItem(STORAGE.CURRENTUSER);
            setIsLogIn(false);
        }}></Button>
        </>
    </DrawerView>
  );
};
export default SettingScreen;
