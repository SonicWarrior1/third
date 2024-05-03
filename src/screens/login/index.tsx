import {
  Alert,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import style from './styles';
import {useState, useContext} from 'react';
import {STORAGE} from '../../constants/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../../interfaces/user_interface';
import {LoginProps, NAVIGATION} from '../../constants/navigation';
import {LoginContext} from '../../navigators/AuthNavigator';
import CustomPassInput from '../../components/input/custom_pass_input';
import {EmailValError, PassEmptyError} from '../../constants/errors';

const Login: ({route, navigation}: LoginProps) => React.JSX.Element = ({
  route,
  navigation,
}) => {
  const setIsLogIn = useContext(LoginContext);
  const [email, setEmail] = useState('');
  const [form, setForm] = useState(false);
  const [password, setPassword] = useState('');
  function testInput(re: RegExp, str: string): boolean {
    return re.test(str);
  }

  async function onLogin() {
    setForm(true);
    const userData = await AsyncStorage.getItem(STORAGE.ALLUSERDATA);
    if (email && password) {
      if (userData) {
        const parsedData: {[key: string]: User} = JSON.parse(userData);
        if (parsedData[email]) {
          if (parsedData[email].password == password) {
            const data = JSON.stringify(parsedData[email]);
            await AsyncStorage.setItem(STORAGE.CURRENTUSER, data);
            setIsLogIn(true);
          } else {
            Alert.alert(
              'Wrong Password',
              'The password you have entered is wrong',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            );
          }
        } else {
          Alert.alert(
            'Email not registered',
            'The email you have entered is not registered',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          );
        }
      } else {
        Alert.alert(
          'Email not registered',
          'The email you have entered is not registered',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        );
      }
    }
  }
  return (
    <SafeAreaView style={style.mainSafeView}>
      <View style={style.main}>
        <Text style={style.text}>EMAIL</Text>
        <TextInput
          style={style.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={e => {
            if (!e.endsWith(' ')) {
              setEmail(e);
            }
          }}
          placeholderTextColor="#5d5e67"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
        />
        <EmailValError email={email} formKey={form} />
        <Text style={style.text}>PASSWORD</Text>
        <CustomPassInput
          placeholderText="Password"
          value={password}
          onChangeText={str => {
            setPassword(str);
          }}
          eyeColor="white"
          inputColor="white"
        />
        <PassEmptyError pass={password} formKey={form} />
        <TouchableOpacity style={style.button} onPress={onLogin}>
          <Text style={style.buttonText}>Log In</Text>
        </TouchableOpacity>
        <Pressable
          onPress={() => {
            navigation.navigate(NAVIGATION.SIGNUP);
          }}>
          <Text style={style.signuptext}>Don't have an account ? Signup</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Login;
