import React, {useState} from 'react';
import {FlatList, Pressable, SafeAreaView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {filterType, RootState, todoType} from '../../Store';
import CustomInput from '../../components/input/custom_input';
import CustomButton from '../../components/input/custom_button';
import CheckBox from '@react-native-community/checkbox';
import {Dropdown} from 'react-native-element-dropdown';

function Todo() {
  const dataList = useSelector<RootState, todoType[]>(state => state.todos);
  const filters = useSelector<RootState, filterType>(state => state.filters);
  console.log(dataList);
  console.log(filters);
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const colors = ['red', 'blue', 'green', 'orange', 'purple'];
  function colorFilter(item: {
    id: number;
    text: string;
    completed: boolean;
    color?: string;
  }) {
    if (item.color === undefined || filters.colors.length === 0) {
      return true;
    }
    return filters.colors.includes(item.color);
  }
  function statusFilter(item: {
    id: number;
    text: string;
    completed: boolean;
    color?: string;
  }) {
    if (filters.status === 'Completed') {
      return item.completed;
    } else if (filters.status === 'Active') {
      return !item.completed;
    } else {
      return true;
    }
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 10,
          paddingHorizontal: 15,
        }}>
        <CustomInput
          placeholderText="What needs to be done"
          onChangeText={str => {
            setText(str);
          }}
          type="name"
          value={text}
          flex={3}
          inputColor="black"
        />
        <CustomButton
          title="ADD"
          flex={1}
          onPress={() => {
            if (text) {
              dispatch({type: 'todos/TodoAdded', payload: text});
              setText('');
            }
          }}
          marginTop={0}
        />
      </View>
      <FlatList
        data={dataList.filter(item => statusFilter(item) && colorFilter(item))}
        style={{flex: 1, paddingTop: 10}}
        renderItem={({item}) => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 15,
              }}>
              <CheckBox
                value={item.completed}
                onChange={() => {
                  dispatch({type: 'todos/TodoToggled', payload: item.id});
                }}
              />
              <Text style={{fontSize: 18,width:120}}>{item.text}</Text>
              <Dropdown
                style={{width: 120, borderWidth: 1, paddingHorizontal: 5}}
                data={[
                  {label: 'Red', value: 'red'},
                  {label: 'Blue', value: 'blue'},
                  {label: 'Green', value: 'green'},
                  {label: 'Orange', value: 'orange'},
                  {label: 'Purple', value: 'purple'},
                ]}
                labelField={'label'}
                onChange={val => {
                  dispatch({
                    type: 'todos/TodoAddColor',
                    payload: {id: item.id, color: val.value},
                  });
                }}
                value={item.color}
                valueField={'value'}
              />
              <Pressable
                onPress={() => {
                  dispatch({type: 'todos/TodoDelete', payload: item.id});
                }}>
                <Text>X</Text>
              </Pressable>
            </View>
          );
        }}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                borderWidth: 1,
                borderColor: 'grey',
                marginVertical: 10,
              }}></View>
          );
        }}
      />
      <View
        style={{
          borderWidth: 1,
          borderColor: 'grey',
          marginVertical: 10,
        }}></View>
      <Text>
        Remaining Todos{' '}
        {dataList.reduce((acc, curr) => {
          if (curr.completed === false) {
            acc++;
          }
          return acc;
        }, 0)}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <CustomButton
            title="Mark All Completed"
            onPress={() => {
              dispatch({type: 'todos/TodoAllCompleted'});
            }}
          />
          <CustomButton
            title="Clear Completed"
            onPress={() => {
              dispatch({type: 'todos/TodoClearCompleted'});
            }}
          />
        </View>
        <View style={{flexDirection: 'column', flex: 1}}>
          <Dropdown
            style={{
              width: 120,
              borderWidth: 1,
              paddingHorizontal: 5,
              marginLeft: 10,
              marginBottom: 5,
            }}
            data={[
              {label: 'All', value: 'All'},
              {label: 'Active', value: 'Active'},
              {label: 'Completed', value: 'Completed'},
            ]}
            labelField={'label'}
            value={filters.status}
            onChange={val => {
              console.log(val.value);
              dispatch({type: 'todos/ChangeTodoStatus', payload: val.value});
            }}
            valueField={'value'}
          />
          {colors.map(color => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
              }}
              key={color}>
              <CheckBox
                style={{marginHorizontal: 20}}
                onValueChange={val => {
                  if (val) {
                    dispatch({type: 'todos/AddColorFilter', payload: color});
                  } else {
                    dispatch({type: 'todos/RemoveColorFilter', payload: color});
                  }
                }}
              />
              <View
                style={{
                  backgroundColor: color,
                  width: 25,
                  height: 15,
                  marginRight: 20,
                }}></View>
              <Text>{color}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Todo;
