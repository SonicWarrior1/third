import React, {useEffect} from 'react';
import {View, Pressable, Text} from 'react-native';
import style from './style';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';

function TabButton({
  options,
  routeName,
  navigation,
  isFocused,
}: Readonly<{
  options: BottomTabNavigationOptions;
  routeName: string;
  navigation: BottomTabBarProps['navigation'];
  isFocused: boolean;
}>) {
  const bottom = useSharedValue(0);
  const borderWidth = useSharedValue(0);
  const textBottom = useSharedValue(10);
  useEffect(() => {
    if (!isFocused) {
      bottom.value = withSpring(0, {duration: 1000});
      borderWidth.value = withSpring(0, {duration: 1000});
      textBottom.value = withSpring(10, {duration: 1000});
    } else {
      bottom.value = withSpring(30, {duration: 1000});
      borderWidth.value = withSpring(5, {duration: 1000});
      textBottom.value = withSpring(25, {duration: 1000});
    }
  }, [isFocused]);
  const icon = options.tabBarIcon!({color: 'black', size: 20, focused: true});
  return (
    <View>
      <Pressable
        onPress={() => {
          navigation.navigate(routeName);
        }}>
        <Animated.View
          style={[
            style.button,
            {
              bottom,
              borderWidth,
              // borderBottomWidth:borderWidth,
              // borderLeftWidth:borderWidth,
              // borderRightWidth:borderWidth
            },
          ]}>
          {icon}
        </Animated.View>
      </Pressable>
      <Animated.Text
        style={[
          style.text,
          {
            color: isFocused ? 'orange' : 'black',
            bottom: textBottom,
          },
        ]}>
        {options.title}
      </Animated.Text>
    </View>
  );
}

export default TabButton;
