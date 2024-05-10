import {Image, Text, View} from 'react-native';
import style from './styles';
import User from '../../interfaces/user_interface';
import {HomeScreenProps} from '../../constants/navigation';
import {useSelector} from 'react-redux';
import {RootState} from '../../Redux/Store';

const Home: ({route, navigation}: HomeScreenProps) => React.JSX.Element = ({
  route,
  navigation,
}) => {
  const user: User = useSelector<RootState, User>(
    state => state.UserReducer?.currentUser!,
  );
  if (user) {
    user.dob = new Date(user.dob);
  }
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
      </View>
    </View>
  );
};

export default Home;
