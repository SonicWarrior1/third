import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {FlatList, Text, View, Pressable} from 'react-native';
import User from '../../interfaces/user_interface';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UserTabScreenProps} from '../../constants/navigation';

const AllUsers: ({
  route,
  navigation,
}: UserTabScreenProps) => React.JSX.Element = ({route, navigation}) => {
  const [allUsers, setAllUsers] = useState<{[key: string]: User}>();
  async function getAllUsers() {
    const userData = await AsyncStorage.getItem('userData');
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
    <SafeAreaView style={{flex: 1}}>
      <View style={{paddingHorizontal: 15}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
          All Users
        </Text>
        {allUsers && (
          <FlatList
            data={Object.values(allUsers)}
            ItemSeparatorComponent={() => <View style={{height: 10}}></View>}
            renderItem={({item}) => {
              const date = new Date(item.dob);
              return (
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 15,
                    borderRadius: 20,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        backgroundColor: 'orange',
                        height: 40,
                        width: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                        marginRight: 15,
                      }}>
                      <Text>{item.firstName[0].toLocaleUpperCase()}</Text>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                      <View style={{flexDirection: 'row', columnGap: 10}}>
                        <Text>
                          {item.firstName} {item.lastName}
                        </Text>
                        <Text>{date.toLocaleDateString()}</Text>
                      </View>
                      <View style={{flexDirection: 'row', columnGap: 10}}>
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
