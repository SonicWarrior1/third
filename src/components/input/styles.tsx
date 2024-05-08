import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  passInputContainer: {
    borderWidth: 2,
    borderRadius: 20,
    height: 60,
    marginBottom: 10,
    marginTop: 5,
    paddingLeft: 20,
    borderColor: '#4f4f53',
    color: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },
  passInput: {
    color: 'black',
    flex: 1,
  },
  passShowBtn: {color: 'black', textDecorationLine: 'underline'},
  input: {
    borderWidth: 2,
    borderRadius: 20,
    height: 60,
    marginBottom: 10,
    marginTop: 5,
    paddingHorizontal: 20,
    borderColor: '#4f4f53',
    color: 'white',
  },  button: {
    backgroundColor: '#3bc68b',
    borderRadius: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {color: 'white'},error: {
    color: 'rgb(255,51,51)',
    fontSize: 12,
    paddingLeft: 12,
    marginTop: -5,
    marginBottom: 10,
  },main: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default style;