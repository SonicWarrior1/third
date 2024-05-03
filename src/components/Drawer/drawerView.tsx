import {View, Pressable} from 'react-native';
import {ICONS} from '../../constants/icons';
import React from 'react';

function DrawerView({
  navigation,
  children,
}: Readonly<{
  navigation;
  children: React.JSX.Element;
}>) {
  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: 'white', height: 100}}>
        <View style={{flex: 1, justifyContent: 'flex-end', direction: 'rtl'}}>
          <Pressable
            style={{marginLeft: 8, marginBottom: 5, width: 30}}
            onPress={() => {
              navigation.openDrawer();
            }}>
            {ICONS.DRAWER({
              height: 20,
              width: 20,
            })}
          </Pressable>
        </View>
      </View>
      {children}
    </View>
  );
}
export default DrawerView;
