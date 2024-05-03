import {TextInput} from 'react-native';
import style from './styles';

function CustomInput({
  value,
  onChangeText,
  type,
  placeholderText,
  maxLength = 100,
}: Readonly<{
  value: string;
  onChangeText: (str: string) => void;
  type: 'email' | 'name';
  placeholderText: string;
  maxLength?: number;
}>) {
  return (
    <TextInput
      style={style.input}
      placeholder={placeholderText}
      keyboardType={type === 'name' ? 'default' : 'email-address'}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor="#5d5e67"
      autoCapitalize={type === 'name' ? 'words' : 'none'}
      autoCorrect={false}
      maxLength={maxLength}
    />
  );
}
export default CustomInput