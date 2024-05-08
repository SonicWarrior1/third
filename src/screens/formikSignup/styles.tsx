import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  text: {fontSize: 16, fontWeight: 'bold', color: 'white'},
  titleText: {alignSelf: 'center', fontSize: 18, marginBottom: 15},
  mainSafeView: {flex: 1, backgroundColor: 'rgb(51,50,56)'},
  main: {
    flex: 1,
    marginHorizontal: 30,
    justifyContent: 'center',
    marginTop: 10,
    paddingBottom: 10,
  },
  error: {
    color: 'rgb(255,51,51)',
    fontSize: 12,
    paddingLeft: 12,
    marginTop: -5,
    marginBottom: 10,
  },
});

export default style;
