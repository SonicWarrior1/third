import React, {useState} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import ProfileImage from '../signup/components/profile_image';
import style from './styles';
import {Formik} from 'formik';
import CustomInput from '../../components/input/custom_input';
import * as Yup from 'yup';
import CustomButton from '../../components/input/custom_button';
import {nameRegex, passRegex} from '../../constants/strings';
import DatePick from '../signup/components/dob';
import {phoneInputStyle} from '../signup/styles';
import PhoneInput, {isValidNumber} from 'react-native-phone-number-input';
import {Country} from 'react-native-country-picker-modal';
import CustomPassInput from '../../components/input/custom_pass_input';
function FormikSignup() {
  const [image, setImage] = useState('');
  return (
    <SafeAreaView style={style.mainSafeView}>
      <KeyboardAwareScrollView extraHeight={150} style={{flex: 1}}>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            dob: new Date(),
            phone: '',
            country: {
              callingCode: ['91'],
              cca2: 'IN',
              currency: ['INR'],
              flag: 'flag-in',
              name: 'India',
              region: 'Asia',
              subregion: 'Southern Asia',
            },
            pass: '',
            confirmPass: '',
            image: '',
          }}
          onSubmit={values => {
            console.log(values);
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .required('First Name cannot be Empty')
              .matches(nameRegex, 'First Name is not Valid'),
            lastName: Yup.string()
              .required('Last Name cannot be Empty')
              .matches(nameRegex, 'Last Name is not Valid'),
            email: Yup.string()
              .required('Email cannot be Empty')
              .email('Email is not Valid'),
            dob: Yup.date().required('DOB cannot be empty'),
            phone: Yup.string().required('Phone Number cannot be Empty'),
            pass: Yup.string()
              .required('Password cannot be Empty')
              .matches(
                passRegex,
                'Password must contain atleast 1 Uppercase, 1 Lowercase, 1 Numeric and 1 Symbol Character',
              ),
            confirmPass: Yup.string()
              .required('Confirm Password cannot be Empty')
              .equals([Yup.ref('pass')], 'Passwords must match'),
          })}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            setFieldError,
          }) => (
            <View style={style.main}>
              <ProfileImage image={image} setImage={setImage} />
              {/* {errors.image && !image && (
                <Text style={[style.error, {alignSelf: 'center'}]}>
                  {errors.image}
                </Text>
              )} */}
              <Text style={[style.text, style.titleText]}>
                Create Your Account
              </Text>
              <Text style={style.text}>FIRST NAME</Text>
              <CustomInput
                onChangeText={handleChange('firstName')}
                value={values.firstName}
                placeholderText="First Name"
                type="name"
                onBlur={handleBlur('firstName')}
              />
              {errors.firstName && touched.firstName && (
                <Text style={style.error}>{errors.firstName}</Text>
              )}
              <Text style={style.text}>LAST NAME</Text>
              <CustomInput
                onChangeText={handleChange('lastName')}
                value={values.lastName}
                placeholderText="Last Name"
                type="name"
                onBlur={handleBlur('lastName')}
              />
              {errors.lastName && touched.lastName && (
                <Text style={style.error}>{errors.lastName}</Text>
              )}
              <Text style={style.text}>EMAIL</Text>
              <CustomInput
                onChangeText={handleChange('email')}
                value={values.email}
                placeholderText="Email"
                type="email"
                onBlur={handleBlur('email')}
              />
              {errors.email && touched.email && (
                <Text style={style.error}>{errors.email}</Text>
              )}
              <Text style={style.text}>DOB</Text>
              <DatePick value={values.dob} setFieldValue={setFieldValue} />
              <Text style={style.text}>PHONE NUMBER</Text>
              <PhoneInput
                value={values.phone}
                onChangeText={async str => {
                  await setFieldValue('phone', str);
                  if (
                    !isValidNumber(str, values.country.cca2 as Country['cca2'])
                  ) {
                    setFieldError('phone', 'Phone number is not Valid');
                  }
                }}
                onChangeCountry={async str => {
                  await setFieldValue('country', str);
                }}
                containerStyle={phoneInputStyle.container}
                textContainerStyle={phoneInputStyle.textContainerStyle}
                codeTextStyle={phoneInputStyle.codeTextStyle}
                textInputStyle={phoneInputStyle.textInputStyle}
                textInputProps={{
                  placeholderTextColor: '#5d5e67',
                  selectionColor: undefined,
                  onBlur: handleBlur('phone'),
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
              {errors.phone && touched.phone && (
                <Text style={style.error}>{errors.phone}</Text>
              )}
              <Text style={style.text}>PASSWORD</Text>
              <CustomPassInput
                onChangeText={handleChange('pass')}
                placeholderText="Password"
                value={values.pass}
                eyeColor="white"
                inputColor="white"
              />
              {errors.pass && touched.pass && (
                <Text style={style.error}>{errors.pass}</Text>
              )}
              <Text style={style.text}>CONFIRM PASSWORD</Text>
              <CustomPassInput
                onChangeText={async str => {
                  await setFieldValue('confirmPass', str);
                }}
                placeholderText="Confirm Password"
                value={values.confirmPass}
                eyeColor="white"
                inputColor="white"
              />
              {errors.confirmPass && touched.confirmPass && (
                <Text style={style.error}>{errors.confirmPass}</Text>
              )}
              <CustomButton
                title="Sign Up"
                onPress={() => {
                  console.log(errors);
                  handleSubmit();
                }}
              />
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default FormikSignup;
