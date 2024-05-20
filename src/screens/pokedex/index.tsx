import React, {useEffect, useState} from 'react';
import {useGetPokemonQuery} from '../../Redux/api/apislice';
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import style from './styles';
import {FlatList} from 'react-native-gesture-handler';
import PokeModal from './components/pokeModal';

function PokeDex() {
  const [offset, setOffset] = useState(0);
  const {data, isFetching} = useGetPokemonQuery(
    {
      offset: offset,
      count: 15,
    },
    {},
  );
  const [modal, setModal] = useState(false);
  const [pokemon, setPokemon] = useState(0);
  const [finalData, setFinalData] = useState<
    Array<{
      name: string;
      url: string;
    }>
  >([]);
  useEffect(() => {
    if (data) {
      setFinalData(finalData => {
        return [...finalData, ...data.results];
      });
    }
  }, [data]);
  return (
    <SafeAreaView style={[style.main, {marginBottom: 29}]}>
      {pokemon !== 0 && (
        <PokeModal modal={modal} setModal={setModal} id={pokemon} />
      )}
      <View>
        <FlatList
          onEndReached={() => {
            setOffset(offset => offset + 15);
          }}
          data={finalData}
          numColumns={3}
          renderItem={({item}) => {
            const id = item.url.split('/')[6];
            return (
              <Pressable
                style={style.card}
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
            );
          }}
        />
        {isFetching && <ActivityIndicator style={{marginBottom: 50}} />}
      </View>
    </SafeAreaView>
  );
}

export default PokeDex;
