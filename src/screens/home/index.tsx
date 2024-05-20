import {Image, Text, View} from 'react-native';
import style from './styles';
import {useAppSelector} from '../../Redux/Store';

const Home: () => React.JSX.Element = () => {
  const user = useAppSelector(state => state.user.currentUser); 
  
  return (
    <View style={style.main}>
      <Image source={{uri: user?.image}} style={style.image} />
      <View style={{alignItems: 'flex-start'}}>
        <Text style={style.text}>First Name: {user?.firstName}</Text>
        <Text style={style.text}>Last Name: {user?.lastName}</Text>
        <Text style={style.text}>Email: {user?.email}</Text>
        <Text style={style.text}>
          Date of Birth: {new Date(user?.dob!).toLocaleDateString()}
        </Text>
        <Text style={style.text}>Phone: {user?.phone}</Text>
        <Text style={style.text}>Password: {user?.password}</Text>
      </View>
    </View>
  );
};

export default Home;
