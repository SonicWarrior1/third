import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  Text,
  View,
} from 'react-native';
import {
  useLazyGetEvolutionIdQuery,
  useLazyGetEvolutionsQuery,
  useGetPokemonDetailByNameQuery,
} from '../../../Redux/api/apislice';
import style from './styles';
import Type from './pokeType';
interface Species {
  name: string;
  url: string;
}
interface EvolutionChain {
  evolution_details: [];
  evolves_to: EvolutionChain[];
  is_baby: boolean;
  species?: Species;
}

type Data = {
  baby_trigger_item: null;
  chain: EvolutionChain;
  id: number;
};
function extractSpecies(data: Data): Species[] {
  const speciesArray: Species[] = [];
  function traverse(node: EvolutionChain) {
    if (node.species) {
      speciesArray.push(node.species);
    }

    if (node.evolves_to) {
      node.evolves_to.forEach(traverse);
    }
  }

  traverse(data.chain);
  return speciesArray;
}
function PokeModal({
  modal,
  setModal,
  id,
}: Readonly<{
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}>) {
  const [loading, setLoading] = useState(true);
  const {data} = useGetPokemonDetailByNameQuery(id);
  const [getSpecies] = useLazyGetEvolutionIdQuery();
  const [getEvo] = useLazyGetEvolutionsQuery();
  const [evoChain, setEvoChain] = useState<Species[]>([]);
  const fn = async (data: {
    abilities: string[];
    id: string;
    name: string;
    weight: string;
    height: string;
    base_experience: string;
    type: string;
    species: string;
  }) => {
    setLoading(true);
    const res = await getSpecies(data.species);
    const res2 = await getEvo(res.data!);
    const x = extractSpecies(res2.data);
    setEvoChain(x);
    setLoading(false);
  };
  useEffect(() => {
    fn(data!);
  }, [data]);

  return (
    <Modal visible={modal} transparent={true} animationType="fade">
      <Pressable
        style={style.modalBackground}
        onPress={() => {
          setModal(false);
        }}>
        {loading ? (
          <ActivityIndicator color="orange" size={100} />
        ) : (
          <Pressable
            style={style.modal}
            onPress={() => {}}>
            <View
              style={style.mainView}>
              <Image
                source={{
                  uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    data!.id
                  }.png`,
                }}
                height={200}
                width={200}
              />
              <View
                style={style.nameRow}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {data?.name[0].toUpperCase() + data?.name.slice(1)!}
                </Text>
                {data?.type === 'normal' && (
                  <Type
                    color="grey"
                    type={data.type}
                    img="https://archives.bulbagarden.net/media/upload/thumb/a/ae/Normal_icon.png/60px-Normal_icon.png"
                  />
                )}
                {data?.type === 'fire' && (
                  <Type
                    color="red"
                    type={data.type}
                    img="https://archives.bulbagarden.net/media/upload/thumb/5/5e/Fire_icon.png/60px-Fire_icon.png"
                  />
                )}
                {data?.type === 'fighting' && (
                  <Type
                    color="#ff8000"
                    type={data.type}
                    img="https://archives.bulbagarden.net/media/upload/thumb/7/7d/Fighting_icon.png/60px-Fighting_icon.png"
                  />
                )}
                {data?.type === 'water' && (
                  <Type
                    color="#2980ef"
                    type={data.type}
                    img="https://archives.bulbagarden.net/media/upload/thumb/7/7f/Water_icon.png/20px-Water_icon.png"
                  />
                )}
                {data?.type === 'flying' && (
                  <Type
                    color="#81b9ef"
                    type={data.type}
                    img="https://archives.bulbagarden.net/media/upload/thumb/f/f0/Flying_icon.png/20px-Flying_icon.png"
                  />
                )}
                {data?.type === 'grass' && (
                  <Type
                    color="#3fa129"
                    type={data.type}
                    img="https://archives.bulbagarden.net/media/upload/thumb/c/cb/Grass_icon.png/20px-Grass_icon.png"
                  />
                )}
                {data?.type === 'poison' && (
                  <Type
                    color="#9141cb"
                    type={data.type}
                    img="https://archives.bulbagarden.net/media/upload/thumb/8/84/Poison_icon.png/20px-Poison_icon.png"
                  />
                )}
                {data?.type === 'electric' && (
                  <Type
                    color="#fac000"
                    type={data.type}
                    img="https://archives.bulbagarden.net/media/upload/thumb/a/af/Electric_icon.png/20px-Electric_icon.png"
                  />
                )}
                {data?.type === 'ground' && (
                  <Type
                    color="#915121"
                    type={data.type}
                    img="https://archives.bulbagarden.net/media/upload/thumb/5/58/Ground_icon.png/20px-Ground_icon.png"
                  />
                )}
                {data?.type === 'psychic' && (
                  <Type
                    color="#ef4179"
                    type={data.type}
                    img="https://archives.bulbagarden.net/media/upload/thumb/a/a6/Psychic_icon.png/20px-Psychic_icon.png"
                  />
                )}
                {data?.type === 'rock' && (
                  <Type
                    color="#afa981"
                    type={data.type}
                    img="https://archives.bulbagarden.net/media/upload/thumb/f/ff/Rock_icon.png/20px-Rock_icon.png"
                  />
                )}
                {data?.type === 'ice' && (
                  <Type
                    color="#3dcef3"
                    type={data.type}
                    img="https://archives.bulbagarden.net/media/upload/thumb/8/83/Ice_icon.png/20px-Ice_icon.png"
                  />
                )}
                {data?.type === 'bug' && (
                  <Type
                    color="#91a119"
                    type={data.type}
                    img="https://archives.bulbagarden.net/media/upload/thumb/7/79/Bug_icon.png/20px-Bug_icon.png"
                  />
                )}
                {data?.type === 'dragon' && (
                  <Type
                    color="#5060e1"
                    type={data.type}
                    img="https://archives.bulbagarden.net/media/upload/thumb/9/91/Dragon_icon.png/20px-Dragon_icon.png"
                  />
                )}
                {data?.type === 'ghost' && (
                  <Type
                    color="#704170"
                    type={data.type}
                    img="https://archives.bulbagarden.net/media/upload/thumb/8/82/Ghost_icon.png/20px-Ghost_icon.png"
                  />
                )}
                {data?.type === 'dark' && (
                  <Type
                    color="#624d4e"
                    type={data.type}
                    img="https://archives.bulbagarden.net/media/upload/thumb/3/33/Dark_icon.png/20px-Dark_icon.png"
                  />
                )}
                {data?.type === 'steel' && (
                  <Type
                    color="#60a1b8"
                    type={data.type}
                    img="https://archives.bulbagarden.net/media/upload/thumb/b/b8/Steel_icon.png/20px-Steel_icon.png"
                  />
                )}
                {data?.type === 'fairy' && (
                  <Type
                    color="#ef70ef"
                    type={data.type}
                    img="https://archives.bulbagarden.net/media/upload/thumb/5/5a/Fairy_icon.png/20px-Fairy_icon.png"
                  />
                )}
              </View>
              <View style={style.description}>
                <Text>Base Expereince: {data?.base_experience} </Text>
                <Text>Weight: {data?.weight} </Text>
                <Text>Height: {data?.height} </Text>
                <Text>Abilities:</Text>
              </View>

              <View style={style.abilityCtr}>
                {data?.abilities.map((ability: string) => (
                  <View
                    key={ability}
                    style={style.ability}>
                    <Text
                      style={{
                        padding: 10,
                      }}>
                      {ability}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{flexDirection: 'row'}}>
                {evoChain.map(poke => (
                  <Image
                    key={poke.name}
                    source={{
                      uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                        poke.url.split('/')[6]
                      }.png`,
                    }}
                    height={110}
                    width={110}
                  />
                ))}
              </View>
            
            </View>
          </Pressable>
        )}
      </Pressable>
    </Modal>
  );
}

export default PokeModal;


