import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  main: {
    paddingHorizontal: 10,
    height: 90,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderColor: '#f2f2f2',
  },
  text:{
    alignSelf: 'center',
    fontSize: 12,
  }
});

export default style;
