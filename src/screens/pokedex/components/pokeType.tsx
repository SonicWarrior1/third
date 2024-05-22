import React from 'react';
import {View, Image, Text} from 'react-native';

function Type({
  type,
  color,
  img,
}: Readonly<{type: string; color: string; img: string}>) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#5a5a5a',
        borderRadius: 20,
        minWidth: 100,
        columnGap: 8,
      }}>
      <View
        style={{
          backgroundColor: color,
          width: 25,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: 8,
          paddingVertical: 4,
        }}>
        <Image
          source={{
            uri: img,
          }}
          width={20}
          height={20}
        />
      </View>
      <View
        style={{
          backgroundColor: color,
          transform: [{skewX: '-12deg'}],
          zIndex: -1,
          left: 10,
          width: 20,
          height: 27.84,
          borderBottomLeftRadius: 20,
          position: 'absolute',
          paddingHorizontal: 5,
          paddingVertical: 2,
        }}></View>
      <Text
        style={{
          color: 'white',
          paddingHorizontal: 10,
          alignSelf: 'center',
          fontWeight: 'bold',
        }}>
        {' '}
        {type[0].toUpperCase() + type.slice(1)}
      </Text>
    </View>
  );
}
export default React.memo(Type);
