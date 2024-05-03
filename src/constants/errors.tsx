import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {emailRegex, passRegex} from './strings';

export function ConfirmPassError({
  pass,
  confirmPass,
  formKey,
}: Readonly<{
  pass: string;
  confirmPass: string;
  formKey: boolean;
}>) {
  return (
    <>
      {confirmPass !== '' && confirmPass !== pass && (
        <Text style={style.error}>Password do not match</Text>
      )}
      {confirmPass === '' && formKey && (
        <Text style={style.error}>Confirm Password cannot be Empty</Text>
      )}
    </>
  );
}
function testInput(re: RegExp, str: string): boolean {
  return re.test(str);
}

export function PassValidationError({
  pass,
  formKey,
}: Readonly<{pass: string; formKey: boolean}>) {
  return (
    <>
      {!!pass && !testInput(passRegex, pass) && (
        <Text style={style.error}>
          Password must contain atleast 1 Uppercase, 1 Lowercase, 1 Numeric and
          1 Symbol Character
        </Text>
      )}
      {pass === '' && formKey && (
        <Text style={style.error}>Password cannot be Empty</Text>
      )}
    </>
  );
}

export function PassEmptyError({
  pass,
  formKey,
}: Readonly<{
  pass: string;
  formKey: boolean;
}>) {
  return (
    <>
      {pass === '' && formKey && (
        <Text style={style.error}>Password cannot be Empty</Text>
      )}
    </>
  );
}

export function EmailValError({
  email,
  formKey,
}: Readonly<{
  email: string;
  formKey: boolean;
}>) {
  return (
    <>
      {!!email && !testInput(emailRegex, email) && (
        <Text style={style.error}>Email is not Valid</Text>
      )}
      {email === '' && formKey && (
        <Text style={style.error}>Email cannot be Empty</Text>
      )}
    </>
  );
}

const style = StyleSheet.create({
  error: {
    color: 'rgb(255,51,51)',
    fontSize: 12,
    paddingLeft: 12,
    marginTop: -5,
    marginBottom: 10,
  },
});
