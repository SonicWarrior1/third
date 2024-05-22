import {Image, Text, View} from 'react-native';
import style from './styles';
import {useAppSelector} from '../../Redux/Store';
import Animated, {
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const Home: () => React.JSX.Element = () => {
  const user = useAppSelector(state => state.user.currentUser);
  const gyroscope = useAnimatedSensor(SensorType.GYROSCOPE);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotateZ: withSpring(`${gyroscope.sensor.value.z * 10}deg`)},
        // {rotateY: withSpring(`${gyroscope.sensor.value.y * 20}deg`)},
        // {rotateX: withSpring(`${gyroscope.sensor.value.x * 10}deg`)},
      ],
    };
  });
  console.log(gyroscope.sensor.value);
  return (
    <View style={[style.main]}>
      <Animated.View style={animatedStyle}>
      <Image source={{uri: user?.image}} style={style.image} />
      </Animated.View>
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
