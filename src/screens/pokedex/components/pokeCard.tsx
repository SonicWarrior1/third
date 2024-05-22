import Animated, {
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {ICONS} from '../../../constants/icons';
import {Image, Pressable, Text} from 'react-native';
import {useEffect} from 'react';
import style from '../styles';
import React from 'react';

function PokeCard({
  item,
  setPokemon,
  setModal,
  id,
  index,
}: Readonly<{
  item: {
    name: string;
    url: string;
  };
  setPokemon: (value: React.SetStateAction<number>) => void;
  setModal: (value: React.SetStateAction<boolean>) => void;
  id: string;
  index: number;
}>) {
  const scale = useSharedValue(0);
  const rotateZ = useSharedValue('0deg');
  const translateY = useSharedValue(0);
  useEffect(() => {
    translateY.value = withDelay(
      400 * (index % 15),
      withSequence(withTiming(30), withTiming(0)),
    );
    rotateZ.value = withDelay(
      400 * (index % 15) + 300,
      withRepeat(
        withSequence(
          withTiming('15deg', {duration: 300}),
          withTiming('-15deg', {duration: 300}),
        ),
        3,
      ),
    );
    scale.value = withDelay(400 * (index % 15) + 1000, withSpring(1));
    return () => {
      scale.value = 0;
      translateY.value = 0;
      rotateZ.value = '0deg';
    };
  }, []);
  return (
    <>
      <Animated.View style={{transform: [{scale}]}}>
        <Pressable
          style={[style.card]}
          onPress={() => {
            setPokemon(+id);
            setModal(true);
          }}>
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            }}
            height={150}
            width={150}
          />
          <Text>{item.name}</Text>
        </Pressable>
      </Animated.View>
      <Animated.View
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          left: (index % 3) * 130 + 35,
          transform: [{translateY}, {rotateZ}],
          zIndex: -1,
        }}>
        {ICONS.Pokeball({height: 50, width: 50})}
      </Animated.View>
    </>
  );
}

export default React.memo(PokeCard);
