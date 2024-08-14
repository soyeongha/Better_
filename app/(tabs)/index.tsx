import Header from '@/components/Header'; // Header 컴포넌트를 불러옵니다.
import { useNavigation } from '@react-navigation/native'; // 네비게이션 훅을 가져옵니다.
import React, { useState, useEffect, useLayoutEffect } from 'react'; // 필요한 React 훅들을 가져옵니다.
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native'; // React Native의 기본 컴포넌트들을 가져옵니다.
import BannerSlider from '@/components/BannerSlider'; // 배너 슬라이더 컴포넌트를 불러옵니다.

const { width } = Dimensions.get('window'); // 화면의 너비를 가져옵니다.

const HomeScreen = () => {
  const [products, setProducts] = useState([]); // 상품 목록을 저장할 상태 변수
  const [brands, setBrands] = useState({}); // 브랜드별 상품을 저장할 상태 변수
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 관리할 상태 변수
  const navigation = useNavigation(); // 네비게이션 훅을 사용하여 네비게이션 객체를 가져옵니다.

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Header />, // 헤더 제목에 Header 컴포넌트를 설정합니다.
      headerStyle: {
        backgroundColor: 'white', // 헤더의 배경색을 흰색으로 설정합니다.
      },
      headerTintColor: 'black', // 헤더의 텍스트 색상을 검정색으로 설정합니다.
    });
  }, [navigation]); // navigation 객체가 변경될 때마다 이 useLayoutEffect가 실행됩니다.

  useEffect(() => {
    fetch('https://makeup-api.herokuapp.com/api/v1/products.json') // API에서 제품 데이터를 가져옵니다.
      .then((response) => response.json()) // JSON 형태로 응답을 파싱합니다.
      .then((data) => {
        const filteredProducts = data
          .filter((item) => item.price > 0 && item.api_featured_image) // 가격이 0보다 크고 이미지가 있는 제품만 필터링합니다.
          .sort((a, b) => b.id - a.id) // ID를 기준으로 내림차순 정렬합니다.
          .slice(0, 12); // 상위 12개의 제품만 선택합니다.
        setProducts(filteredProducts); // 필터링된 제품 목록을 상태에 저장합니다.

        const groupedByBrand = data.reduce((acc, product) => {
          if (product.price > 0 && product.api_featured_image) {
            if (!acc[product.brand]) acc[product.brand] = []; // 브랜드가 없으면 빈 배열을 생성합니다.
            acc[product.brand].push(product); // 해당 브랜드 배열에 제품을 추가합니다.
          }
          return acc;
        }, {});

        for (let brand in groupedByBrand) {
          if (groupedByBrand[brand].length >= 12) {
            groupedByBrand[brand] = groupedByBrand[brand]
              .sort((a, b) => b.id - a.id) // ID를 기준으로 내림차순 정렬합니다.
              .slice(0, 8); // 상위 8개의 제품만 선택합니다.
          } else {
            delete groupedByBrand[brand]; // 제품이 12개 미만인 브랜드는 삭제합니다.
          }
        }

        setBrands(groupedByBrand); // 브랜드별 제품 목록을 상태에 저장합니다.
        setIsLoading(false); // 로딩 상태를 false로 설정합니다.
      });
  }, []); // 컴포넌트가 마운트될 때만 실행됩니다.

  // 신상품 목록에 각 아이템을 렌더링하는 함수
  const renderProductItem = ({ item }) => {
    const imageUrl = item.api_featured_image.startsWith('//')
      ? `https:${item.api_featured_image}` // 이미지 URL이 '//'로 시작하는 경우, 'https:'를 붙여서 수정합니다.
      : item.api_featured_image;

    return (
      <TouchableOpacity
        style={styles.productContainer} // 스타일 적용
        onPress={
          () => navigation.navigate('ProductScreen', { productId: item.id }) // 상품 아이템을 클릭했을 때 ProductScreen으로 이동
        }
      >
        <Image source={{ uri: imageUrl }} style={styles.productImage} />
        <Text style={styles.productBrand}>{item.brand}</Text>
        <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>
        <Text style={styles.productPrice}>{`₩${(
          parseInt(item.price) * 1600
        ).toLocaleString()}`}</Text>
      </TouchableOpacity>
    );
  };

  // 브랜드별로 섹션을 렌더링하는 함수
  const renderBrandSection = (brand, products) => (
    <View key={brand}>
      {/* 브랜드를 키로 사용하여 각 섹션을 생성합니다. */}
      <Text style={styles.brandName}>{brand}</Text>
      <FlatList
        data={products} // 브랜드에 해당하는 제품 목록
        renderItem={renderProductItem} // 각 아이템을 렌더링하는 함수
        keyExtractor={(item) => item.id.toString()} // 각 아이템의 고유 키를 설정합니다.
        horizontal // 수평 스크롤
        showsHorizontalScrollIndicator={true} // 수평 스크롤 표시기 표시
        ListFooterComponent={() => (
          <TouchableOpacity
            style={styles.moreButton} // 버튼 스타일을 상품 이미지와 유사하게 설정합니다.
            onPress={
              () => navigation.navigate('BrandScreen', { brandName: brand }) // 더보기 버튼을 눌렀을 때 해당 브랜드의 상품들을 전부 볼 수 있는 BrandScreen으로 이동
            }
          >
            <Text style={styles.moreButtonText}>더보기</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* 스크롤 가능한 컨테이너 */}
      <BannerSlider />
      <Text style={styles.sectionTitle}>신상품</Text>
      <FlatList
        data={products} // 신상품 목록
        renderItem={renderProductItem} // 각 아이템을 렌더링하는 함수
        keyExtractor={(item) => item.id.toString()} // 각 아이템의 고유 키를 설정합니다.
        numColumns={3} // 3열로 구성
        scrollEnabled={false} // 스크롤 비활성화
      />
      <Text style={styles.sectionTitle}>브랜드별 상품 목록</Text>
      {Object.keys(brands).map(
        (brand) => renderBrandSection(brand, brands[brand]) // 각 브랜드 섹션 렌더링
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // 화면 전체를 차지하도록 설정합니다. flex: 1은 부모 컨테이너의 남은 공간을 모두 차지하게 합니다.
  },
  bannerImage: {
    width: width, // 화면의 전체 너비를 설정합니다.
    height: 200, // 배너의 높이를 200으로 설정합니다.
  },
  sectionTitle: {
    fontSize: 20, // 텍스트의 폰트 크기를 18로 설정합니다.
    fontWeight: 'bold', // 텍스트를 굵게 표시합니다.
    //  marginVertical: 20, // 상하로 10 단위의 마진을 추가하여 위아래 여백을 만듭니다.
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 10,
  },
  brandName: {
    marginLeft: 10,
    marginTop: 5,
    fontSize: 20,
  },
  productContainer: {
    flex: 1, // 가로 방향으로 공간을 균등하게 분배합니다.
    margin: 8, // 상하좌우로 8 단위의 마진을 추가하여 여백을 설정합니다.
    alignItems: 'center', // 컨테이너 안의 아이템을 가운데 정렬합니다.
    backgroundColor: 'white', // 배경색을 흰색으로 설정합니다.
    borderRadius: 10, // 모서리의 둥글기 정도를 10으로 설정하여 둥글게 만듭니다.
    shadowColor: '#000', // 그림자의 색상을 검정색으로 설정합니다.
    shadowOffset: { width: 0, height: 2 }, // 그림자의 위치를 아래로 2 단위 이동시킵니다.
    shadowOpacity: 0.2, // 그림자의 투명도를 20%로 설정합니다.
    shadowRadius: 4, // 그림자의 흐림 정도를 4로 설정합니다.
    elevation: 3, // 안드로이드에서 그림자의 높이를 설정합니다.
    padding: 13, // 컨테이너 내부의 여백을 13 단위로 설정합니다.
  },
  productImage: {
    width: 100, // 이미지의 너비를 100으로 설정합니다.
    height: 100, // 이미지의 높이를 100으로 설정합니다.
    borderRadius: 10, // 이미지의 모서리를 둥글게 만들기 위해 10으로 설정합니다.
    marginBottom: 10, // 이미지와 하단 요소 간의 여백을 10 단위로 설정합니다.
    resizeMode: 'contain',
  },
  productBrand: {
    fontSize: 14, // 브랜드 텍스트의 폰트 크기를 14로 설정합니다.
    fontWeight: 'bold', // 브랜드 텍스트를 굵게 표시합니다.
    marginBottom: 5, // 브랜드 텍스트와 하단 텍스트 간의 여백을 5 단위로 설정합니다.
  },
  productName: {
    fontSize: 12, // 제품 이름의 폰트 크기를 12로 설정합니다.
    maxWidth: 100, // 제품 이름의 최대 너비를 100으로 설정하여 긴 텍스트를 잘리게 만듭니다.
    marginBottom: 5, // 제품 이름과 가격 간의 여백을 5 단위로 설정합니다.
  },
  productPrice: {
    fontSize: 12, // 제품 가격의 폰트 크기를 12로 설정합니다.
    color: 'black', // 제품 가격의 텍스트 색상
  },
  moreButton: {
    flex: 1, // 버튼의 크기를 컨테이너에 맞게 조정합니다.
    margin: 8, // 버튼과 주변 요소 간의 여백을 8 단위로 설정합니다.
    alignItems: 'center', // 버튼 내의 텍스트를 가운데 정렬합니다.
    backgroundColor: 'white', // 버튼의 배경색을 흰색으로 설정합니다.
    borderRadius: 10, // 버튼의 모서리를 둥글게 만들기 위해 10으로 설정합니다.
    shadowColor: '#000', // 버튼의 그림자 색상을 검정색으로 설정합니다.
    shadowOffset: { width: 0, height: 2 }, // 버튼의 그림자 위치를 아래로 2 단위 이동시킵니다.
    shadowOpacity: 0.2, // 버튼의 그림자 투명도를 20%로 설정합니다.
    shadowRadius: 4, // 버튼의 그림자 흐림 정도를 4로 설정합니다.
    elevation: 3, // 버튼의 그림자 높이를 설정합니다.
    padding: 13, // 버튼 내부의 여백을 13 단위로 설정합니다.
    justifyContent: 'center', // 버튼 내부의 텍스트를 수직 중앙에 정렬합니다.
    paddingHorizontal: 20, // 버튼의 좌우 패딩을 20 단위로 설정합니다.
    paddingVertical: 10, // 버튼의 상하 패딩을 10 단위로 설정합니다.
  },
  moreButtonText: {
    fontSize: 14, // 더보기 버튼의 텍스트 폰트 크기를 14로 설정합니다.
    fontWeight: 'bold', // 더보기 버튼의 텍스트를 굵게 표시합니다.
    color: '#000', // 더보기 버튼의 텍스트 색상을 검정색으로 설정합니다.
  },
});

export default HomeScreen;
