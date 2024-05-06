import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import { View} from 'react-native';

import {STORAGE} from '../../constants/strings';
import {LoginContext} from '../../navigators/AuthNavigator';
import DrawerView from '../../components/Drawer/drawerView';
import CustomButton from '../../components/input/custom_button';

const SettingScreen: ({route, navigation}) => React.JSX.Element = ({
  route,
  navigation,
}) => {
  const setIsLogIn = useContext(LoginContext);
  return (
    <DrawerView navigation={navigation}>
      <View style={{flex: 1, justifyContent: 'center',paddingHorizontal:20}}>
        <CustomButton
          title="Change Password"
          onPress={async () => {
            navigation.push('changePass');
          }}
          btnColor='orange'
          />
        {/* <CustomButton
          title="Billing Information"
          onPress={async () => {
            navigation.push('Billing');
          }}/> */}
        <CustomButton
          title="Signout"
          onPress={async () => {
            await AsyncStorage.removeItem(STORAGE.CURRENTUSER);
            setIsLogIn(false);
          }}
          btnColor='#FC4100'
          />
      </View>
    </DrawerView>
  );
};
export default SettingScreen;
