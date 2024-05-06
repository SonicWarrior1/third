import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
} from 'react-native';
import style from './styles';

function CustomInput({
  value,
  onChangeText,
  type,
  placeholderText,
  maxLength = 100,
  inputColor = 'white',
  onBlur,
}: Readonly<{
  value: string;
  onChangeText: (str: string) => void;
  type: 'email' | 'name';
  placeholderText: string;
  maxLength?: number;
  inputColor?: string;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}>) {
  return (
    <TextInput
      style={[style.input, {color: inputColor}]}
      placeholder={placeholderText}
      keyboardType={type === 'name' ? 'default' : 'email-address'}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor="#5d5e67"
      autoCapitalize={type === 'name' ? 'words' : 'none'}
      autoCorrect={false}
      maxLength={maxLength}
      onBlur={onBlur}
    />
  );
}
export default CustomInput;
