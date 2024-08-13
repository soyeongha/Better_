import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import Header from '@/components/Header';
import { useNavigation } from 'expo-router';

// JSON 데이터 불러오기
const data = require('../../assets/data/makeup-api.json');

const productTypes = [
  'Blush',
  'Bronzer',
  'Eyebrow',
  'Eyeliner',
  'Eyeshadow',
  'Foundation',
  'Lip liner',
  'Lipstick',
  'Mascara',
  'Nail polish',
];

const formatPrice = (price) => {
  if (!price || price === '0.0') return '가격 정보 없음';
  const priceNumber = parseFloat(price) * 1600;
  return priceNumber.toLocaleString('ko-KR'); // 한국 원화 형식으로 포맷
};

const CategoryScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(productTypes[0]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Header />, // Header 컴포넌트를 헤더로 사용
    });
  }, [navigation]);

  useEffect(() => {
    // 선택된 카테고리에 따라 제품 목록을 필터링
    const filtered = data
      .filter(
        (product) =>
          product.product_type ===
            selectedCategory.toLowerCase().replace(' ', '_') &&
          product.price !== '0.0' &&
          product.price !== null &&
          product.api_featured_image // 이미지 링크가 있는지 확인
      )
      .map((product) => ({
        ...product,
        api_featured_image: product.api_featured_image.startsWith('//')
          ? `https:${product.api_featured_image}`
          : product.api_featured_image,
      }));
    setFilteredProducts(filtered);
  }, [selectedCategory]);

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() =>
        navigation.navigate('ProductScreen', { productId: item.id })
      }
    >
      <Image
        source={{ uri: item.api_featured_image }}
        style={styles.productImage}
      />
      <Text style={styles.productBrand}>{item.brand}</Text>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>₩{formatPrice(item.price)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabBar}
      >
        {productTypes.map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setSelectedCategory(type)}
            style={[
              styles.tabItem,
              selectedCategory === type && styles.selectedTabItem,
            ]}
          >
            <Text style={styles.tabText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.content}>
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    maxHeight: 60,
  },
  tabItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTabItem: {
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  productList: {
    justifyContent: 'space-between',
  },
  productItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  productBrand: {
    fontSize: 14,
    color: '#888',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
  },
});

export default CategoryScreen;
