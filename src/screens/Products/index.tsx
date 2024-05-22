import React, {Dispatch, useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../Redux/Store';
import {product} from '../../Redux/sagas';
import CustomInput from '../../components/input/custom_input';
import {Action, PayloadAction} from '@reduxjs/toolkit';
import style from './styles';
import Carousel from 'react-native-reanimated-carousel';
import CustomButton from '../../components/input/custom_button';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';

function debounceDispatch(fn: Dispatch<Action>, delay = 300) {
  let timer: any = null;
  return (action: PayloadAction<string>) => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => fn(action), delay);
  };
}
function Products() {
  const bottom = useSharedValue(15);
  const right = useSharedValue(10);

  const pan = Gesture.Pan()
    .onChange(event => {
      bottom.value -= event.changeY;
      right.value -= event.changeX;
    })
    .onFinalize(event => {
      right.value = withDecay({
        velocity: event.velocityX,
        rubberBandEffect: true,
        clamp: [10, 500],
      });
      bottom.value = withDecay({
        velocity: event.velocityY,
        rubberBandEffect: true,
        clamp: [15, 700],
      });
    });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({type: 'getProducts'});
  }, []);

  const debouncedDispatch = useCallback(debounceDispatch(dispatch, 1000), []);
  function onChangeText(str: string) {
    setSearch(str);
    debouncedDispatch({type: 'searchProduct', payload: str});
  }
  const products = useAppSelector(state => state.user.products);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [newModal, setNewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<product>();

  const [prod, setProd] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
  });
  return (
    <SafeAreaView style={[style.main, {paddingBottom: 50}]}>
      {selectedProduct && (
        <Modal visible={modal} transparent={true} animationType="fade">
          <Pressable
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
            onPress={() => {
              setModal(false);
            }}>
            <Pressable
              style={{
                backgroundColor: 'white',
                borderRadius: 20,
                maxWidth: 350,
              }}
              onPress={() => {}}>
              <Carousel
                width={350}
                height={300}
                autoPlay
                data={selectedProduct.images}
                scrollAnimationDuration={1000}
                style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}
                onSnapToItem={index => console.log('current index:', index)}
                renderItem={({item}) => (
                  <Image source={{uri: item}} height={300} width={350} />
                )}
              />
              <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
                <Text numberOfLines={2}>{selectedProduct.title}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: 'green'}}>
                    ↓{selectedProduct.discountPercentage}%{' '}
                  </Text>
                  <Text
                    style={{
                      color: 'grey',
                      textDecorationLine: 'line-through',
                    }}>
                    {(
                      (selectedProduct.price * 100) /
                      (100 - selectedProduct.discountPercentage)
                    ).toPrecision(5)}
                    {'  '}
                  </Text>
                  <Text>${selectedProduct.price}</Text>
                </View>
                {selectedProduct.rating.toString().startsWith('1') && (
                  <Text style={style.star}>★</Text>
                )}
                {selectedProduct.rating.toString().startsWith('2') && (
                  <Text style={style.star}>★★</Text>
                )}
                {selectedProduct.rating.toString().startsWith('3') && (
                  <Text style={style.star}>★★★</Text>
                )}
                {selectedProduct.rating.toString().startsWith('4') && (
                  <Text style={style.star}>★★★★</Text>
                )}
                {selectedProduct.rating.toString().startsWith('5') && (
                  <Text style={style.star}>★★★★★</Text>
                )}
                <Text>{selectedProduct.description}</Text>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      )}
      <Modal visible={newModal} transparent={true} animationType="fade">
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          onPress={() => {
            setNewModal(false);
          }}>
          <Pressable
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              width: 350,
            }}
            onPress={() => {}}>
            <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
              <CustomInput
                onChangeText={str => {
                  setProd(prod => {
                    return {...prod, title: str};
                  });
                }}
                inputColor="black"
                placeholderText="Title"
                type="name"
                value={prod.title}
              />
              <CustomInput
                onChangeText={str => {
                  setProd(prod => {
                    return {...prod, price: str};
                  });
                }}
                inputColor="black"
                placeholderText="Price"
                type="name"
                value={prod.price}
              />
              <CustomInput
                onChangeText={str => {
                  setProd(prod => {
                    return {...prod, description: str};
                  });
                }}
                inputColor="black"
                placeholderText="Description"
                type="name"
                value={prod.description}
              />
              <CustomInput
                onChangeText={str => {
                  setProd(prod => {
                    return {...prod, category: str};
                  });
                }}
                inputColor="black"
                placeholderText="Category"
                type="name"
                value={prod.category}
              />
              <CustomButton
                onPress={() => {
                  dispatch({type: 'addProduct', payload: prod});
                  setNewModal(false);
                  setProd({
                    title: '',
                    price: '',
                    description: '',
                    category: '',
                  });
                }}
                title="Add Product"></CustomButton>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
      <CustomInput
        value={search}
        onChangeText={onChangeText}
        placeholderText="Search"
        type="name"
        inputColor="black"
      />
      <FlatList
        numColumns={2}
        data={products}
        renderItem={({item: product}) => {
          return (
            <Pressable
              onLongPress={() => {
                setSelectedProduct(product);
                setModal(true);
              }}
              onPressOut={() => {
                setModal(false);
              }}>
              <View style={style.card} key={product.id}>
                <Image
                  source={{uri: product.thumbnail}}
                  height={165}
                  width={185}
                  style={style.image}
                />

                <View style={{marginLeft: 15}}>
                  <Text numberOfLines={2}>{product.title}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'green'}}>
                      ↓{product.discountPercentage}%{' '}
                    </Text>
                    <Text
                      style={{
                        color: 'grey',
                        textDecorationLine: 'line-through',
                      }}>
                      {(
                        (product.price * 100) /
                        (100 - product.discountPercentage)
                      ).toPrecision(5)}
                      {'  '}
                    </Text>
                    <Text>${product.price}</Text>
                  </View>
                  {product.rating.toString().startsWith('1') && (
                    <Text style={style.star}>★</Text>
                  )}
                  {product.rating.toString().startsWith('2') && (
                    <Text style={style.star}>★★</Text>
                  )}
                  {product.rating.toString().startsWith('3') && (
                    <Text style={style.star}>★★★</Text>
                  )}
                  {product.rating.toString().startsWith('4') && (
                    <Text style={style.star}>★★★★</Text>
                  )}
                  {product.rating.toString().startsWith('5') && (
                    <Text style={style.star}>★★★★★</Text>
                  )}
                </View>
              </View>
            </Pressable>
          );
        }}
      />
      <GestureDetector gesture={pan}>
        <Animated.View
          style={{
            position: 'absolute',
            right: right,
            bottom: bottom,
          }}>
          <Pressable
            style={{
              backgroundColor: 'orange',
              borderRadius: 50,
              height: 60,
              width: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              setNewModal(true);
            }}>
            <Text style={{fontSize: 28, alignSelf: 'center'}}>+</Text>
          </Pressable>
        </Animated.View>
      </GestureDetector>
    </SafeAreaView>
  );
}

export default Products;
