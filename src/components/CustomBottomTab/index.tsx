import {Pressable, View, Text} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {ICONS} from '../../constants/icons';
import style from './style';
export default function CustomTabBar({
  state,
  navigation,
}: Readonly<BottomTabBarProps>) {
  return (
    <View style={style.main}>
      <View>
        <Pressable
          style={[
            style.button,
            {
              bottom: state.index == 0 ? 30 : 0,
              borderWidth: state.index == 0 ? 5 : 0,
            },
          ]}
          onPress={() => {
            navigation.navigate('Drawer');
          }}>
          {ICONS.HOME({height: 20, width: 20})}
        </Pressable>
        <Text
          style={[
            style.text,
            {
              color: state.index == 0 ? 'orange' : 'black',
              bottom: state.index == 0 ? 25 : 10,
            },
          ]}>
          Home
        </Text>
      </View>
      <View>
        <Pressable
          style={[
            style.button,
            {
              bottom: state.index == 1 ? 30 : 0,
              borderWidth: state.index == 1 ? 5 : 0,
            },
          ]}
          onPress={() => {
            navigation.navigate('Products');
          }}>
          {ICONS.Shopping({height: 20, width: 20})}
        </Pressable>
        <Text
          style={[
            style.text,
            {
              color: state.index == 1 ? 'orange' : 'black',
              bottom: state.index == 1 ? 25 : 10,
            },
          ]}>
          Products
        </Text>
      </View>
      <View>
        <Pressable
          style={[
            style.button,
            {
              bottom: state.index == 2 ? 30 : 0,
              borderWidth: state.index == 2 ? 5 : 0,
            },
          ]}
          onPress={() => {
            navigation.navigate('PokeDex');
          }}>
          {ICONS.Pokemon({height: 20, width: 20})}
        </Pressable>
        <Text
          style={[
            style.text,
            {
              color: state.index == 2 ? 'orange' : 'black',
              bottom: state.index == 2 ? 25 : 10,
            },
          ]}>
          PokeDex
        </Text>
      </View>
      <View>
        <Pressable
          style={[
            style.button,
            {
              bottom: state.index == 3 ? 30 : 0,
              borderWidth: state.index == 3 ? 5 : 0,
            },
          ]}
          onPress={() => {
            navigation.navigate('Todo');
          }}>
          {ICONS.Todo({height: 20, width: 20})}
        </Pressable>
        <Text
          style={[
            style.text,
            {
              color: state.index == 3 ? 'orange' : 'black',
              bottom: state.index == 3 ? 25 : 10,
            },
          ]}>
          Todo
        </Text>
      </View>
      <View>
        <Pressable
          style={[
            style.button,
            {
              bottom: state.index == 4 ? 30 : 0,
              borderWidth: state.index == 4 ? 5 : 0,
            },
          ]}
          onPress={() => {
            navigation.navigate('Users');
          }}>
          {ICONS.USERS({height: 20, width: 20})}
        </Pressable>
        <Text
          style={[
            style.text,
            {
              color: state.index == 4 ? 'orange' : 'black',
              bottom: state.index == 4 ? 25 : 10,
            },
          ]}>
          Users
        </Text>
      </View>
    </View>
  );
}
