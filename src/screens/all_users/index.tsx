import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import User from '../../interfaces/user_interface';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UserTabScreenProps} from '../../constants/navigation';
import style from './styles';
import { STORAGE } from '../../constants/strings';
function itemSeperator() {
  return <View style={{height: 10}}></View>;
}
const AllUsers: ({
  route,
  navigation,
}: UserTabScreenProps) => React.JSX.Element = ({route, navigation}) => {
  const [allUsers, setAllUsers] = useState<{[key: string]: User}>();
  async function getAllUsers() {
    const userData = await AsyncStorage.getItem(STORAGE.ALLUSERDATA);
    if (userData) {
      const parsed = JSON.parse(userData);
      setAllUsers(parsed);
      navigation.setOptions({
        tabBarBadge: Object.values(parsed).length,
      });
    }
  }
  useEffect(() => {
    getAllUsers();
  }, []);
  console.log(allUsers);
  return (
    <SafeAreaView style={style.safeView}>
      <View style={style.insideView}>
        <Text style={style.headerText}>All Users</Text>
        {allUsers && (
          <FlatList
            data={Object.values(allUsers)}
            ItemSeparatorComponent={() => itemSeperator()}
            renderItem={({item}) => {
              const date = new Date(item.dob);
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
                        <Text>{date.toLocaleDateString()}</Text>
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
