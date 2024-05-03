import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  title: {
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
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
  error: {
    color: 'rgb(255,51,51)',
    fontSize: 12,
    paddingLeft: 12,
    marginTop: -5,
    marginBottom: 10,
  },
  passInput: {
    color: 'black',
    flex: 1,
  },
  passShowBtn: {color: 'black', textDecorationLine: 'underline'},
  main: {
    flex: 1,
    marginHorizontal: 30,
    justifyContent: 'center',
    marginTop: 10,
    paddingBottom: 10,
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
});
export default style;
