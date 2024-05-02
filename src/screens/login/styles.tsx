import {StyleSheet} from 'react-native';

const style = StyleSheet.create({mainSafeView: {flex: 1, backgroundColor: 'rgb(51,50,56)'},
  main: {
    flex: 1,
    marginHorizontal: 30,
    justifyContent: 'center',
    marginTop: 10,
    paddingBottom: 10,
  },
  input: {
    borderWidth: 2,
    borderRadius: 20,
    height: 40,
    marginBottom: 10,
    marginTop: 5,
    paddingHorizontal: 20,
    borderColor: '#4f4f53',
    color: 'white',
  },
  passShowBtn: {color: 'white', textDecorationLine: 'underline'},
  text: {fontSize: 16, fontWeight: 'bold', color: 'white'},
  error: {
    color: 'rgb(255,51,51)',
    fontSize: 12,
    paddingLeft: 12,
    marginTop: -5,
    marginBottom: 10,
  },
  passInputContainer: {
    borderWidth: 2,
    borderRadius: 20,
    height: 40,
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
    color: 'white',
    flex: 1,
  },
  button: {
    backgroundColor: '#3bc68b',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {color: 'white'},
  signuptext: {
    marginTop: 10,
    color: 'white',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default style;
