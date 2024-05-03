import React, {useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import style from './styles';
import {passRegex, STORAGE} from '../../constants/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../../interfaces/user_interface';
import CustomPassInput from '../../components/input/custom_pass_input';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../constants/navigation';
import {
  ConfirmPassError,
  PassEmptyError,
  PassValidationError,
} from '../../constants/errors';

const ChangePass: ({
  route,
  navigation,
}: NativeStackScreenProps<
  RootStackParamList,
  'changePass'
>) => React.JSX.Element = ({route, navigation}) => {
  const [currPass, setCurrpass] = useState('');

  const [newPass, setNewpass] = useState('');

  const [confirmNewPass, setConfirmNewpass] = useState('');

  const [form, setForm] = useState(false);
  function testInput(re: RegExp, str: string): boolean {
    return re.test(str);
  }
  async function changePass() {
    setForm(true);
    const data = await AsyncStorage.getItem(STORAGE.CURRENTUSER);
    if (data) {
      const user: User = JSON.parse(data);
      console.log(user);
      if (currPass !== '' && currPass === user.password) {
        if (
          newPass !== '' &&
          testInput(passRegex, newPass) &&
          newPass === confirmNewPass
        ) {
          const allData = await AsyncStorage.getItem(STORAGE.ALLUSERDATA);
          if (allData) {
            const allUserData = JSON.parse(allData);
            const res = JSON.stringify({
              ...allUserData,
              [user.email]: {...user, password: newPass},
            });
            await AsyncStorage.setItem(STORAGE.ALLUSERDATA, res);
            Alert.alert('Password has been changed', '', [
              {
                text: 'Ok',
                onPress: () => {
                  navigation.navigate('Home');
                },
              },
            ]);
          }
        }
      } else {
        currPass && Alert.alert('Current Password is Wrong');
      }
    }
  }
  return (
    <View style={style.main}>
      <Text style={style.title}>Change Password</Text>
      <CustomPassInput
        placeholderText="Current Password"
        value={currPass}
        onChangeText={str => {
          setCurrpass(str);
        }}
      />
      <PassEmptyError pass={currPass} formKey={form} />
      <CustomPassInput
        placeholderText="New Password"
        value={newPass}
        onChangeText={str => {
          setNewpass(str);
        }}
      />
      <PassValidationError pass={newPass} formKey={form} />
      <CustomPassInput
        placeholderText="Confirm New Password"
        value={confirmNewPass}
        onChangeText={str => {
          setConfirmNewpass(str);
        }}
      />
      <ConfirmPassError
        pass={newPass}
        confirmPass={confirmNewPass}
        formKey={form}
      />
      <TouchableOpacity style={style.button} onPress={changePass}>
        <Text style={style.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ChangePass;
