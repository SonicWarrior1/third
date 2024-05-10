import React, {useRef, useState} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../Redux/Store';
import CustomInput from '../../components/input/custom_input';
import CustomButton from '../../components/input/custom_button';
import CheckBox from '@react-native-community/checkbox';
import {Dropdown} from 'react-native-element-dropdown';
import {Swipeable} from 'react-native-gesture-handler';
import {todoType, filterType} from '../../Redux/Reducers/todoSlice';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {
  TodoAddColorFilter,
  TodoAllCompleted,
  TodoClearCompleted,
  TodoDelete,
  TodoRemoveColorFilter,
  todosAdded,
  TodosChangeTodoStatus,
  todoToggled,
} from '../../Redux/Actions/todoActions';

function Todo() {
  const dataList = useSelector<RootState, todoType[]>(
    state => state.TodoReducer?.todos!,
  );
  const filters = useSelector<RootState, filterType>(
    state => state.TodoReducer?.filters!,
  );
  console.log(dataList);
  console.log(filters);
  const [text, setText] = useState('');
  const dispatch = useDispatch<AppDispatch>();
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
  const actionSheetRef = useRef<ActionSheetRef>(null);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ActionSheet ref={actionSheetRef}>
        <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
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
                  dispatch(TodoAllCompleted());
                }}
              />
              <CustomButton
                title="Clear Completed"
                onPress={() => {
                  dispatch(TodoClearCompleted());
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
                  dispatch(
                    TodosChangeTodoStatus(
                      val.value as 'All' | 'Active' | 'Completed',
                    ),
                  );
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
                    value={filters.colors.includes(color)}
                    onValueChange={val => {
                      if (val) {
                        dispatch(TodoAddColorFilter(color));
                      } else {
                        dispatch(TodoRemoveColorFilter(color));
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
        </View>
      </ActionSheet>
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
              dispatch(todosAdded(text));
              setText('');
            }
          }}
          marginTop={0}
        />
      </View>
      <Button
        title="Filters"
        onPress={() => {
          actionSheetRef.current?.show();
        }}
      />
      <FlatList
        data={dataList.filter(item => statusFilter(item) && colorFilter(item))}
        style={{flex: 1, paddingTop: 10}}
        renderItem={({item}) => {
          return (
            <Swipeable
              renderRightActions={() => {
                return (
                  <View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'red',
                        height: '100%',
                        justifyContent: 'center',
                        paddingHorizontal: 15,
                        borderRadius: 30,
                      }}
                      onPress={() => {
                        dispatch(TodoDelete(item.id));
                      }}>
                      <Text style={{color: 'white'}}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  backgroundColor: 'white',
                  borderRadius: 30,
                  paddingVertical: 8,
                  marginHorizontal: 10,
                }}>
                <CheckBox
                  value={item.completed}
                  onChange={() => {
                    dispatch(todoToggled(item.id));
                  }}
                />
                <Text style={{fontSize: 18, width: 120}}>{item.text}</Text>
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
              </View>
            </Swipeable>
          );
        }}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                marginVertical: 5,
              }}></View>
          );
        }}
      />
    </SafeAreaView>
  );
}

export default Todo;
