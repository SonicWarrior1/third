import React, {useRef, useState} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../Redux/Store';
import CustomInput from '../../components/input/custom_input';
import CustomButton from '../../components/input/custom_button';
import CheckBox from '@react-native-community/checkbox';
import {Dropdown} from 'react-native-element-dropdown';
import {Swipeable} from 'react-native-gesture-handler';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';

import {
  todoAddColor,
  todoAddColorFilter,
  todoAdded,
  todoAllComplete,
  todoChangeTodoStatus,
  todoClearComplete,
  todoDelete,
  todoRemoveColorFilter,
  todoToggle,
} from '../../Redux/Reducers/todoSlice';
import style from './style';

function Todo() {
  const dataList = useAppSelector(state => state.todo.todos);
  const filters = useAppSelector(state => state.todo.filters);
  console.log(dataList);
  console.log(filters);
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
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
    <SafeAreaView style={style.safeView}>
      <ActionSheet ref={actionSheetRef}>
        <View style={style.actionSheetView}>
          <Text>
            Remaining Todos{' '}
            {dataList.reduce((acc, curr) => {
              if (curr.completed === false) {
                acc++;
              }
              return acc;
            }, 0)}
          </Text>
          <View style={style.actionOutCtr}>
            <View style={style.actionInCtr}>
              <CustomButton
                title="Mark All Completed"
                onPress={() => {
                  dispatch(todoAllComplete());
                }}
              />
              <CustomButton
                title="Clear Completed"
                onPress={() => {
                  dispatch(todoClearComplete());
                }}
              />
            </View>
            <View style={style.actionInCtr}>
              <Dropdown
                style={style.dropdown}
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
                    todoChangeTodoStatus(
                      val.value as 'All' | 'Active' | 'Completed',
                    ),
                  );
                }}
                valueField={'value'}
              />
              {colors.map(color => (
                <View style={style.colorCtr} key={color}>
                  <CheckBox
                    style={{marginHorizontal: 20}}
                    value={filters.colors.includes(color)}
                    onValueChange={val => {
                      if (val) {
                        dispatch(todoAddColorFilter(color));
                      } else {
                        dispatch(todoRemoveColorFilter(color));
                      }
                    }}
                  />
                  <View
                    style={[style.colorBox, {backgroundColor: color}]}></View>
                  <Text>{color}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ActionSheet>
      <View style={style.inputRow}>
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
              dispatch(todoAdded(text));
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
        style={style.list}
        renderItem={({item}) => {
          return (
            <Swipeable
              renderRightActions={() => {
                return (
                  <View>
                    <TouchableOpacity
                      style={style.deleteBtn}
                      onPress={() => {
                        dispatch(todoDelete(item.id));
                      }}>
                      <Text style={{color: 'white'}}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}>
              <View style={style.listItem}>
                <CheckBox
                  value={item.completed}
                  onChange={() => {
                    dispatch(todoToggle(item.id));
                  }}
                />
                <Text style={style.listItemText}>{item.text}</Text>
                <Dropdown
                  style={{width: 120, paddingHorizontal: 5}}
                  renderLeftIcon={() => (
                    <View
                      style={[
                        style.dropdown2,
                        {backgroundColor: item.color},
                      ]}></View>
                  )}
                  data={[
                    {label: 'Red', value: 'red'},
                    {label: 'Blue', value: 'blue'},
                    {label: 'Green', value: 'green'},
                    {label: 'Orange', value: 'orange'},
                    {label: 'Purple', value: 'purple'},
                  ]}
                  labelField={'label'}
                  onChange={val => {
                    dispatch(todoAddColor({id: item.id, color: val.value}));
                  }}
                  value={item.color}
                  valueField={'value'}
                />
              </View>
            </Swipeable>
          );
        }}
        ItemSeparatorComponent={Itemseperator}
      />
    </SafeAreaView>
  );
}
function Itemseperator(): React.JSX.Element {
  return (
    <View
      style={{
        marginVertical: 5,
      }}></View>
  );
}

export default Todo;
