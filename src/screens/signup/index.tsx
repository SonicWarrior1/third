import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  Modal,
  Image,
  SafeAreaView,
  Alert,
  Keyboard,
} from 'react-native';
import style, {phoneInputStyle} from './styles';
import DatePicker from 'react-native-date-picker';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import PhoneInput, {isValidNumber} from 'react-native-phone-number-input';
import {Country} from 'react-native-country-picker-modal';
import {
  emailRegex,
  nameRegex,
  passRegex,
  STORAGE,
} from '../../constants/strings';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../../interfaces/user_interface';
import {NAVIGATION, SignupProps} from '../../constants/navigation';
import CustomPassInput from '../../components/input/custom_pass_input';
import {
  ConfirmPassError,
  EmailValError,
  PassValidationError,
} from '../../constants/errors';
import CustomInput from '../../components/input/custom_input';
function testInput(re: RegExp, str: string): boolean {
  return re.test(str);
}

class Signup extends React.Component<
  SignupProps,
  {
    firstName: string;
    lastName: string;
    email: string;
    dob: Date | null;
    isDateOpen: boolean;
    selectedCountry: Country;
    phone: string;
    password: string;
    confirmPassword: string;
    passVisible: boolean;
    confirmPassVisible: boolean;
    form: boolean;
    image: string | undefined;
    cameraSheet: boolean;
  }
> {
  constructor(props: SignupProps) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      dob: null,
      isDateOpen: false,
      selectedCountry: {
        callingCode: ['91'],
        cca2: 'IN',
        currency: ['INR'],
        flag: 'flag-in',
        name: 'India',
        region: 'Asia',
        subregion: 'Southern Asia',
      },
      phone: '',
      password: '',
      confirmPassword: '',
      passVisible: true,
      confirmPassVisible: true,
      form: false,
      image: undefined,
      cameraSheet: false,
    };
    this.submit = this.submit.bind(this);
    this.openCamera = this.openCamera.bind(this);
    this.openImagePicker = this.openImagePicker.bind(this);
  }

  openImagePicker = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };
    let response = await launchImageLibrary(options);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else {
      let imageUri = response.assets![0].uri;
      console.log(imageUri);
      this.setState({image: imageUri, cameraSheet: false});
    }
  };
  openCamera = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
    };
    let response = await launchCamera(options);
    console.log(response);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else {
      let imageUri = response.assets![0].uri;
      console.log(imageUri);
      this.setState({image: imageUri, cameraSheet: false});
    }
  };
  async submit() {
    this.setState({form: true});
    if (
      this.state.firstName !== '' &&
      testInput(nameRegex, this.state.firstName) &&
      this.state.lastName !== '' &&
      testInput(nameRegex, this.state.lastName) &&
      this.state.email !== '' &&
      testInput(emailRegex, this.state.email) &&
      this.state.phone !== '' &&
      isValidNumber(this.state.phone, this.state.selectedCountry.cca2) &&
      this.state.dob !== null &&
      testInput(passRegex, this.state.password) &&
      this.state.password === this.state.confirmPassword &&
      this.state.image !== undefined
    ) {
      const user: User = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
        dob: this.state.dob,
        password: this.state.password,
        image: this.state.image,
      };
      const userData = await AsyncStorage.getItem(STORAGE.ALLUSERDATA);
      if (userData) {
        const parsedData: {[key: string]: User} = JSON.parse(userData);
        if (parsedData[user.email]) {
          Alert.alert(
            'User Already Exist',
            'The email you have entered is already registered',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          );
          return;
        }
        const obj = {...parsedData, [user.email]: user};
        console.log(obj);
        const data = JSON.stringify(obj);
        await AsyncStorage.setItem(STORAGE.ALLUSERDATA, data);
      } else {
        const obj = {[user.email]: user};
        console.log(obj);
        const data = JSON.stringify(obj);
        await AsyncStorage.setItem(STORAGE.ALLUSERDATA, data);
      }
      this.props.navigation.navigate(NAVIGATION.LOGIN);
    }
  }
  render(): React.ReactNode {
    return (
      <SafeAreaView style={style.mainSafeView}>
        <KeyboardAwareScrollView extraHeight={150} style={{flex: 1}}>
          <View style={style.main}>
            <Modal
              transparent={true}
              visible={this.state.cameraSheet}
              onRequestClose={() => {
                this.setState({cameraSheet: false});
              }}
              animationType="slide">
              <Pressable
                style={{flex: 1}}
                onPress={() => {
                  this.setState({cameraSheet: false});
                }}>
                <Pressable style={style.bottomSheet} onPress={() => {}}>
                  <Pressable
                    style={style.sheetButton}
                    onPress={this.openImagePicker}>
                    <Text>Gallery</Text>
                  </Pressable>
                  <Pressable
                    style={style.sheetButton}
                    onPress={this.openCamera}>
                    <Text>Camera</Text>
                  </Pressable>
                </Pressable>
              </Pressable>
            </Modal>
            <Pressable
              style={style.imageButton}
              onPress={() => {
                this.setState({cameraSheet: true});
              }}>
              <Image
                source={
                  this.state.image
                    ? {uri: this.state.image}
                    : require('../../assets/images/profile.png')
                }
                style={style.image}
              />
            </Pressable>
            {this.state.image === undefined && this.state.form && (
              <Text style={[style.error, {alignSelf: 'center'}]}>
                Please Upload an Image
              </Text>
            )}
            <Text style={[style.text, style.titleText]}>
              Create Your Account
            </Text>
            <Text style={style.text}>FIRST NAME</Text>
            <CustomInput
              type="name"
              value={this.state.firstName}
              onChangeText={e => {
                if (e.endsWith(' ')) {
                  return;
                }
                this.setState({firstName: e});
              }}
              placeholderText="First Name"
              maxLength={30}
            />
            {!!this.state.firstName &&
              !testInput(nameRegex, this.state.firstName) && (
                <Text style={style.error}>First Name is not Valid</Text>
              )}
            {this.state.firstName === '' && this.state.form && (
              <Text style={style.error}>First Name cannot be Empty</Text>
            )}
            <Text style={style.text}>LAST NAME</Text>
            <CustomInput
              value={this.state.lastName}
              placeholderText="Last Name"
              onChangeText={e => {
                if (e.endsWith(' ')) {
                  return;
                }
                this.setState({lastName: e});
              }}
              type="name"
              maxLength={30}
            />
            {!!this.state.lastName &&
              !testInput(nameRegex, this.state.lastName) && (
                <Text style={style.error}>First Name is not Valid</Text>
              )}
            {this.state.lastName === '' && this.state.form && (
              <Text style={style.error}>Last Name cannot be Empty</Text>
            )}
            <Text style={style.text}>EMAIL</Text>
            <CustomInput
              value={this.state.email}
              placeholderText="Email"
              type="email"
              onChangeText={e => {
                if (e.endsWith(' ')) {
                  return;
                }
                this.setState({email: e});
              }}
            />
            <EmailValError email={this.state.email} formKey={this.state.form} />
            <Text style={style.text}>DOB</Text>
            <TextInput
              style={[style.dob, style.dobText]}
              value={this.state.dob?.toLocaleDateString()}
              placeholder="Date of Birth"
              placeholderTextColor="#5d5e67"
              onPress={() => {
                this.setState({isDateOpen: true});
              }}
              onFocus={() => {
                Keyboard.dismiss();
                this.setState({isDateOpen: true});
              }}
            />
            <DatePicker
              modal
              mode="date"
              date={this.state.dob ?? new Date()}
              open={this.state.isDateOpen}
              maximumDate={new Date()}
              minimumDate={new Date('1950-1-1')}
              onConfirm={d => {
                this.setState({dob: d, isDateOpen: false});
              }}
              onCancel={() => {
                this.setState({isDateOpen: false});
              }}
              focusable={true}
            />
            {this.state.dob === null && this.state.form && (
              <Text style={style.error}>DOB cannot be Empty</Text>
            )}
            <Text style={style.text}>PHONE NUMBER</Text>
            <PhoneInput
              value={this.state.phone}
              onChangeText={str => {
                if (str.endsWith(' ')) {
                  return;
                }
                this.setState({phone: str});
              }}
              onChangeCountry={str => {
                this.setState({selectedCountry: str});
              }}
              containerStyle={phoneInputStyle.container}
              textContainerStyle={phoneInputStyle.textContainerStyle}
              codeTextStyle={phoneInputStyle.codeTextStyle}
              textInputStyle={phoneInputStyle.textInputStyle}
              textInputProps={{
                placeholderTextColor: '#5d5e67',
                selectionColor: undefined,
              }}
              defaultCode="IN"
              placeholder="0000 XXX XXX"
              layout="first"
              withDarkTheme
              withShadow
              renderDropdownImage={
                <Image
                  source={require('../../assets/images/dropdown_icon.png')}
                />
              }
            />
            {!!this.state.phone &&
              !isValidNumber(
                this.state.phone,
                this.state.selectedCountry.cca2,
              ) && <Text style={style.error}>Phone number not valid</Text>}
            {this.state.phone === '' && this.state.form && (
              <Text style={style.error}>Phone number cannot be Empty</Text>
            )}
            <Text style={style.text}>PASSWORD</Text>
            <CustomPassInput
              value={this.state.password}
              placeholderText="Password"
              onChangeText={str => {
                this.setState({password: str});
              }}
              eyeColor="white"
              inputColor="white"
            />
            <PassValidationError
              pass={this.state.password}
              formKey={this.state.form}
            />
            <Text style={style.text}>CONFIRM PASSWORD</Text>
            <CustomPassInput
              value={this.state.confirmPassword}
              placeholderText="Confirm Password"
              onChangeText={str => {
                this.setState({confirmPassword: str});
              }}
              eyeColor="white"
              inputColor="white"
            />
            <ConfirmPassError
              confirmPass={this.state.confirmPassword}
              pass={this.state.password}
              formKey={this.state.form}
            />
            <TouchableOpacity style={style.button} onPress={this.submit}>
              <Text style={style.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default Signup;
