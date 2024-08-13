import { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window'); // 기기의 화면 너비를 가져와서 width 변수에 저장

const BannerSlider = () => {
  const bannerImages = [
    {
      id: '1',
      image:
        'https://cdn.pixabay.com/photo/2018/02/08/13/16/essential-oil-3139479_640.jpg',
    }, // 첫 번째 이미지
    {
      id: '2',
      image:
        'https://cdn.pixabay.com/photo/2017/05/30/19/42/cosmetic-2357981_640.jpg',
    }, // 두 번째 이미지
    {
      id: '3',
      image:
        'https://cdn.pixabay.com/photo/2017/09/27/08/44/lavender-2791368_640.jpg',
    }, // 세 번째 이미지
    {
      id: '4',
      image:
        'https://cdn.pixabay.com/photo/2019/04/06/19/33/glass-4108106_640.jpg',
    }, // 네 번째 이미지
  ];

  const flatListRef = useRef<FlatList>(null); // FlatList의 참조를 관리하기 위한 ref 선언
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 슬라이드의 인덱스를 관리하기 위한 상태값

  useEffect(() => {
    const intervalId = setInterval(() => {
      // 3초마다 실행되는 인터벌 설정
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % bannerImages.length; // 다음 인덱스 계산 (배너 이미지를 순환)
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        }); // FlatList를 다음 인덱스로 스크롤
        return nextIndex; // 다음 인덱스를 반환하여 currentIndex 업데이트
      });
    }, 3000); // 3000ms = 3초

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌 제거
  }, []); // 빈 배열을 두어 처음에만 한 번 실행되도록 설정

  // 각 베너 이미지를 렌더링하는 함수
  const renderItem = ({ item }) => (
    <Image
      source={{ uri: item.image }} // 이미지의 소스를 URI로 지정
      style={styles.bannerImage} // 이미지 스타일 지정
    />
  );

  return (
    <FlatList
      ref={flatListRef} // FlatList 참조 설정
      data={bannerImages} // 베너 이미지 데이터
      renderItem={renderItem} // 이미지 렌더링 함수
      keyExtractor={(item) => item.id} // 고유 키 설정
      horizontal // 수평 스크롤
      pagingEnabled // 페이지 단위로 스크롤
      showsHorizontalScrollIndicator={false} // 스크롤바 표시 안함
      onScrollToIndexFailed={() => {}} // 스크롤 실패 시 핸들러 (빈 함수)
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // 화면 전체를 채우도록 설정
  },
  bannerImage: {
    width: width, // 화면 너비에 맞게 설정
    height: 200, // 이미지 높이를 200으로 설정
  },
  sectionTitle: {
    fontSize: 18, // 섹션 제목 폰트 크기
    fontWeight: 'bold', // 섹션 제목 폰트 굵기
    marginVertical: 10, // 섹션 제목 위아래 여백
  },
  productContainer: {
    flex: 1, // 아이템을 화면에 골고루 분배
    margin: 5, // 아이템 간의 여백 설정
    alignItems: 'center', // 중앙 정렬
  },
  productImage: {
    width: 100, // 이미지 너비
    height: 100, // 이미지 높이
  },
  productBrand: {
    fontSize: 14, // 브랜드명 폰트 크기
  },
});

export default BannerSlider;
