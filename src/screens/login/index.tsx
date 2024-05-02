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
import {useEffect, useRef, useState, useContext} from 'react';
import {emailRegex} from '../../constants/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../../interfaces/user_interface';
import {LoginProps, NAVIGATION} from '../../constants/navigation';
import {LoginContext} from '../../App';

const Login: ({route, navigation}: LoginProps) => React.JSX.Element = ({
  route,
  navigation,
}) => {
  const setIsLogIn = useContext(LoginContext);
  const [email, setEmail] = useState('');
  const [form, setForm] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [password, setPassword] = useState('');
  function testInput(re: RegExp, str: string): boolean {
    return re.test(str);
  }
  // let ref = useRef<TextInput>(null);
  // useEffect(() => {
  //   ref.current?.focus();
  //   return () => {
  //     console.log('Hi');
  //   };
  // }, []);
  async function onLogin() {
    setForm(true);
    const userData = await AsyncStorage.getItem('userData');
    if (email && password) {
      if (userData) {
        const parsedData: {[key: string]: User} = JSON.parse(userData);
        if (parsedData[email]) {
          if (parsedData[email].password == password) {
            const data = JSON.stringify(parsedData[email]);
            await AsyncStorage.setItem('currentUser', data);
            setIsLogIn(true);
            // navigation.replace(NAVIGATION.APP);
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
      {/* <KeyboardAwareScrollView style={{flex:1,borderWidth:1}}> */}
      <View style={style.main}>
        <Text style={style.text}>EMAIL</Text>
        <TextInput
          // ref={ref}
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
        {!!email && !testInput(emailRegex, email) && (
          <Text style={style.error}>Email is not Valid</Text>
        )}
        {email === '' && form && (
          <Text style={style.error}>Email cannot be Empty</Text>
        )}
        <Text style={style.text}>PASSWORD</Text>
        <View style={style.passInputContainer}>
          <TextInput
            style={style.passInput}
            placeholder="Password"
            secureTextEntry={showPass}
            value={password}
            onChangeText={e => {
              setPassword(e);
            }}
            placeholderTextColor="#5d5e67"
          />
          <Pressable
            onPress={() => {
              setShowPass(pass => !pass);
            }}>
            <Text style={style.passShowBtn}>{showPass ? 'Show' : 'Hide'}</Text>
          </Pressable>
        </View>
        {password === '' && form && (
          <Text style={style.error}>Password cannot be Empty</Text>
        )}
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
      {/* </KeyboardAwareScrollView> */}
    </SafeAreaView>
  );
};

export default Login;
