import {Button, Image, Text, View} from 'react-native';
import style from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState, useContext} from 'react';
import User from '../../interfaces/user_interface';
import {HomeTabScreenProps} from '../../constants/navigation';
import {LoginContext} from '../../App';

async function getUser(
  func: React.Dispatch<React.SetStateAction<User | undefined>>,
) {
  try {
    const json = await AsyncStorage.getItem('currentUser');
    if (json) {
      const jsonVal: User = JSON.parse(json);
      jsonVal.dob = new Date(jsonVal.dob);
      func(jsonVal);
    }
  } catch (e) {
    console.log(e);
  }
}

const Home: ({route, navigation}: HomeTabScreenProps) => React.JSX.Element = ({
  route,
  navigation,
}) => {
  const setIsLogIn = useContext(LoginContext);
  const [user, setUser] = useState<User>();
  useEffect(() => {
    getUser(setUser);
  });
  return (
    <View style={style.main}>
      <Image source={{uri: user?.image}} style={style.image} />
      <View style={{alignItems: 'flex-start'}}>
        <Text style={style.text}>First Name: {user?.firstName}</Text>
        <Text style={style.text}>Last Name: {user?.lastName}</Text>
        <Text style={style.text}>Email: {user?.email}</Text>
        <Text style={style.text}>
          Date of Birth: {user?.dob.toLocaleDateString()}
        </Text>
        <Text style={style.text}>Phone: {user?.phone}</Text>
        <Text style={style.text}>Password: {user?.password}</Text>
        <Button
          title="Signout"
          onPress={async () => {
            setIsLogIn(false);
            // navigation.replace(NAVIGATION.LOGIN);
            await AsyncStorage.removeItem('currentUser');
          }}></Button>
      </View>
    </View>
  );
};

export default Home;
