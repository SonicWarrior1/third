import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import style from './styles';

function CustomButton({
  onPress,
  title,
  btnColor = '#3bc68b',
  txtColor = 'white',
  disabled = false,
}: Readonly<{
  onPress: () => void;
  title: string;
  btnColor?: string;
  txtColor?: string;
  disabled?: boolean;
}>) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[style.button, {backgroundColor: btnColor}]}
      onPress={onPress}>
      <Text style={[style.buttonText, {color: txtColor}]}>{title}</Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
