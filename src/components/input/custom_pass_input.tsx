import {View, TextInput, Pressable, Text} from 'react-native';
import style from './styles';
import {useState} from 'react';
import {ICONS} from '../../constants/icons';

function CustomPassInput({
  value,
  onChangeText,
  placeholderText,
  eyeColor = 'black',
  inputColor = 'black',
}: Readonly<{
  value: string | undefined;
  onChangeText: (str: string) => void;
  placeholderText: string;
  eyeColor?: string;
  inputColor?: string;
}>) {
  const [showPass, setShowPass] = useState(true);
  return (
    <View style={style.passInputContainer}>
      <TextInput
        style={[style.passInput, {color: inputColor}]}
        placeholder={placeholderText}
        secureTextEntry={showPass}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#5d5e67"
        textContentType="oneTimeCode"
      />
      <Pressable
        onPress={() => {
          setShowPass(pass => !pass);
        }}>
        {showPass
          ? ICONS.EyeClose({height: 20, width: 20})
          : ICONS.EyeOpen({height: 20, width: 20})}
        {/* <Text style={[style.passShowBtn, {color: eyeColor}]}>
          {showPass ? 'Show' : 'Hide'}
        </Text> */}
      </Pressable>
    </View>
  );
}
export default CustomPassInput;
