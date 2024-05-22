import {View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import style from './style';
import TabButton from './tabButton';
export default function CustomTabBar(props: Readonly<BottomTabBarProps>) {
  return (
    <View style={style.main}>
      {props.state.routes.map((route, index) => {
        const {options} = props.descriptors[route.key];
        const isFocused = props.state.index === index;
        return (
          <TabButton
            options={options}
            key={route.key}
            routeName={route.name}
            navigation={props.navigation}
            isFocused={isFocused}
          />
        );
      })}
    </View>
  );
}
