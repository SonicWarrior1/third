import AsyncStorage from '@react-native-async-storage/async-storage';

import {View} from 'react-native';

import {STORAGE} from '../../constants/strings';
import CustomButton from '../../components/input/custom_button';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../Redux/Store';
import {UsersDeleteCurrentUser} from '../../Redux/Actions/userActions';

const SettingScreen: ({route, navigation}) => React.JSX.Element = ({
  route,
  navigation,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    // <DrawerView navigation={navigation}>
    <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}>
      <CustomButton
        title="Change Password"
        onPress={async () => {
          navigation.push('changePass');
        }}
        btnColor="orange"
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
          dispatch(UsersDeleteCurrentUser());
      
        }}
        btnColor="#FC4100"
      />
    </View>
    // </DrawerView>
  );
};
export default SettingScreen;
