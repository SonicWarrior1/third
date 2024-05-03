import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
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
    color: 'black',
    flex: 1,
  },
  passShowBtn: {color: 'black', textDecorationLine: 'underline'},
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
});

export default style;