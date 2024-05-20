import {useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import User from '../../interfaces/user_interface';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabParamList, RootStackParamList, UserTabScreenProps} from '../../constants/navigation';
import style from './styles';
import CustomInput from '../../components/input/custom_input';
import {useAppSelector} from '../../Redux/Store';
import {NavigationProp, useNavigation} from '@react-navigation/native';
function itemSeperator() {
  return <View style={{height: 10}}></View>;
}
const AllUsers: ({
  route,
  navigation,
}: UserTabScreenProps) => React.JSX.Element = ({route, navigation}) => {
  const [search, setSearch] = useState('');
  const allUsers = useAppSelector(state => state.user.allUser);
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
            renderItem={({item}) => {
              return (
                <View style={style.itemBackground}>
                  <View style={style.outerRow}>
                    <View style={style.circle}>
                      <Text>{item.firstName[0].toLocaleUpperCase()}</Text>
                    </View>
                    <View style={style.colmun}>
                      <View style={style.innerRow}>
                        <Text>
                          {item.firstName} {item.lastName}
                        </Text>
                        <Text>{new Date(item.dob).toLocaleDateString()}</Text>
                      </View>
                      <View style={style.innerRow}>
                        <Text>{item.email}</Text>
                        <Text> {item.phone}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
export default AllUsers;
