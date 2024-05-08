import {Formik} from 'formik';
import React from 'react';
import {Text, View} from 'react-native';
import CustomInput from '../../components/input/custom_input';
import * as Yup from 'yup';
import style from '../../components/input/styles';
import CustomButton from '../../components/input/custom_button';
function Billing() {
  return (
    <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}>
      <Formik
        initialValues={{name: '', email: '', address: ''}}
        onSubmit={values => {
          setTimeout(() => console.log(values), 2000);
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .max(20, 'Must be 15 Characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid Email Address')
            .required('Required'),
          address: Yup.string()
            .max(50, 'Must be 50 Characters or less')
            .required('Required'),
        })}
        // validate={values => {
        //   const errors: {name?: string; email?: string} = {};
        //   if (!values.name) {
        //     errors.name = 'Required';
        //   } else if (values.name.length > 15) {
        //     errors.name = 'Must be 15 characters or less';
        //   }
        //   if (!values.email) {
        //     errors.email = 'Required';
        //   } else if (!emailRegex.test(values.email)) {
        //     errors.email = 'Invalid email address';
        //   }
        //   return errors;
        // }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <CustomInput
              onChangeText={handleChange('name')}
              type="name"
              placeholderText="Name"
              value={values.name}
              inputColor="black"
              onBlur={handleBlur('name')}
            />
            {errors.name && touched.name && (
              <Text style={style.error}>{errors.name}</Text>
            )}
            <CustomInput
              onChangeText={handleChange('email')}
              type="email"
              placeholderText="Email"
              value={values.email}
              inputColor="black"
              onBlur={handleBlur('email')}
            />
            {errors.email && touched.email && (
              <Text style={style.error}>{errors.email}</Text>
            )}
            <CustomInput
              onChangeText={handleChange('address')}
              type="name"
              placeholderText="Address"
              value={values.address}
              onBlur={handleBlur('address')}
              inputColor="black"
            />
            {errors.address && touched.address && (
              <Text style={style.error}>{errors.address}</Text>
            )}
            <CustomButton onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  );
}

export default Billing;
