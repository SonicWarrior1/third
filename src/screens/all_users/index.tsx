import {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import User from '../../interfaces/user_interface';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BottomTabParamList,
  RootStackParamList,
  UserTabScreenProps,
} from '../../constants/navigation';
import style from './styles';
import CustomInput from '../../components/input/custom_input';
import {useAppSelector} from '../../Redux/Store';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import Animated, {
  Easing,
  FadeInLeft,
  FadeOutLeft,
  ReduceMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
function itemSeperator() {
  return <View style={{height: 10}}></View>;
}
const AllUsers: ({
  route,
  navigation,
}: UserTabScreenProps) => React.JSX.Element = ({route, navigation}) => {
  const [search, setSearch] = useState('');
  const allUsers = useAppSelector(state => state.user.allUser);
  // console.log(allUsers);
  const left = useSharedValue(-400);
  return (
    <SafeAreaView style={[style.safeView, {marginBottom: 29}]}>
      <View style={style.insideView}>
        <Text style={style.headerText}>All Users</Text>
        <CustomInput
          value={search}
          onChangeText={str => {
            setSearch(str);
          }}
          placeholderText="Search"
          type="name"
          inputColor="black"
        />
        {allUsers && (
          <FlatList
            data={
              search === ''
                ? Object.values(allUsers)
                : Object.values(allUsers).filter((val: User) => {
                    return (
                      (val.firstName + ' ' + val.lastName)
                        .toLowerCase()
                        .includes(search.trim().toLowerCase()) ||
                      val.email.includes(search.trim().toLowerCase())
                    );
                  })
            }
            ItemSeparatorComponent={() => itemSeperator()}
            onViewableItemsChanged={() => {
              console.log('hi');
            }}
            renderItem={({item, index}) => {
              return <ListItem item={item} index={index} />;
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
export default AllUsers;

function ListItem({item, index}: Readonly<{item: User; index: number}>) {
  const left = useSharedValue(-200 * (index + 1));
  const opacity = useSharedValue(0);
  useFocusEffect(() => {
    left.value = withTiming(0, {
      duration: 700,
      easing: Easing.in(Easing.linear),
      reduceMotion: ReduceMotion.System,
    });
    opacity.value = withTiming(1, {
      duration: 900,
      easing: Easing.in(Easing.linear),
      reduceMotion: ReduceMotion.System,
    });
    return () => {
      left.value = -200 * (index + 1);
      opacity.value = 0;
    };
  });
  return (
    <Animated.View style={[style.itemBackground, {left, opacity}]}>
      <View style={style.outerRow}>
        <View style={style.circle}>
          <Text>{item.firstName[0].toLocaleUpperCase()}</Text>
        </View>
        <View style={style.colmun}>
          <View style={style.innerRow}>
            <Text>
              {item.firstName} {item.lastName}
            </Text>
            <Text>{item.dob}</Text>
          </View>
          <View style={style.innerRow}>
            <Text>{item.email}</Text>
            <Text> {item.phone}</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
