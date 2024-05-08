import React, {useState} from 'react';
import {TextInput, Keyboard, Text} from 'react-native';
import style from '../styles';
import DatePicker from 'react-native-date-picker';
import {FormikErrors} from 'formik';

function DatePick({
  value,
  setFieldValue,
}: Readonly<{
  value: Date;
  setFieldValue: (
    field: string,
    value: Date,
    shouldValidate?: boolean,
  ) => Promise<void | FormikErrors<{
    firstName: string;
    lastName: string;
    email: string;
    dob: Date;
  }>>;
}>) {
  const [isDateOpen, setIsDateOpen] = useState(false);
  return (
    <>
      <TextInput
        style={[style.dob, style.dobText]}
        value={value.toLocaleDateString()}
        placeholder="Date of Birth"
        placeholderTextColor="#5d5e67"
        onPress={() => {
          setIsDateOpen(true);
        }}
        onFocus={() => {
          Keyboard.dismiss();
          setIsDateOpen(true);
        }}
      />
      <DatePicker
        modal
        mode="date"
        date={value ?? new Date()}
        open={isDateOpen}
        maximumDate={new Date()}
        minimumDate={new Date('1950-1-1')}
        onConfirm={d => {
          setFieldValue('dob', d);
          setIsDateOpen(false);
        }}
        onCancel={() => {
          setIsDateOpen(false);
        }}
        focusable={true}
      />
      {value === null && <Text style={style.error}>DOB cannot be Empty</Text>}
    </>
  );
}

export default DatePick;
