import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
type product = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {count: number; rate: number};
  title: string;
};
function Products() {
  const [products, setProducts] = useState<product[]>([]);
  async function getProducts() {
    try {
      //   const res = await fetch('https://fakestoreapi.com/products');
      //   const json = await res.json();
      //   setProducts(json);
      const res = await axios.get('https://fakestoreapi.com/products');
      setProducts(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View>
        {products.length === 0 ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            numColumns={2}
            data={products}
            renderItem={({item: product}) => {
              return (
                <View
                  style={{
                    backgroundColor: 'white',
                    width: 185,
                    height: 200,
                    padding: 10,
                    margin: 5,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  key={product.id}>
                  <Image
                    source={{uri: product.image}}
                    height={120}
                    width={120}
                  />
                  <Text numberOfLines={2}>{product.title}</Text>
                  <Text>${product.price}</Text>
                </View>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default Products;
