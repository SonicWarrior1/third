import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  mainSafeView: {flex: 1, backgroundColor: 'rgb(51,50,56)'},
  main: {
    flex: 1,
    marginHorizontal: 30,
    justifyContent: 'center',
    marginTop: 10,
    paddingBottom: 10,
  },
  text: {fontSize: 16, fontWeight: 'bold', color: 'white'},
  signuptext: {
    marginTop: 10,
    color: 'white',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default style;
