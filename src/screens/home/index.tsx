import {Image, Text, View} from 'react-native';
import style from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import User from '../../interfaces/user_interface';
import {HomeScreenProps} from '../../constants/navigation';
import {STORAGE} from '../../constants/strings';
import DrawerView from '../../components/Drawer/drawerView';

const Home: ({route, navigation}: HomeScreenProps) => React.JSX.Element = ({
  route,
  navigation,
}) => {
  async function getUser() {
    try {
      const json = await AsyncStorage.getItem(STORAGE.CURRENTUSER);
      if (json) {
        const jsonVal: User = JSON.parse(json);
        jsonVal.dob = new Date(jsonVal.dob);
        setUser(jsonVal);
      }
    } catch (e) {
      console.log(e);
    }
  }
  const [user, setUser] = useState<User>();
  useEffect(() => {
    getUser();
  },[]);
  return (
    // <DrawerView navigation={navigation}>
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
        </View>
      </View>
    // </DrawerView>
  );
};

export default Home;
