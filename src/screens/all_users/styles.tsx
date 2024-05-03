import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  safeView: {flex: 1},
  insideView: {flex: 1, paddingHorizontal: 15},
  headerText: {fontSize: 20, fontWeight: 'bold', marginBottom: 10},
  itemBackground: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
  },
  outerRow: {flexDirection: 'row'},
  circle: {
    backgroundColor: 'orange',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 15,
  },
  colmun: {flexDirection: 'column', rowGap: 3},
  innerRow: {flexDirection: 'row', columnGap: 10},
});

export default style;
