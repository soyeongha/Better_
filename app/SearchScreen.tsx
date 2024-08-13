import Header from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const SearchScreen = () => {
  const [query, setQuery] = useState(''); // 검색어 상태
  const [results, setResults] = useState([]); // 검색 결과 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const navigation = useNavigation(); // navigation 객체 가져오기

  // 헤더 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      // headerTitle을 홈 아이콘으로 대체
      headerTitle: () => <Header />,
    });
  }, [navigation]);

  // API에서 제품 데이터 가져오기
  const fetchProducts = async (searchQuery) => {
    setLoading(true); // 로딩 시작
    try {
      const response = await fetch(
        `https://makeup-api.herokuapp.com/api/v1/products.json`
      );
      const data = await response.json();
      // 검색어로 필터링하여 결과를 상태로 설정
      setResults(
        data.filter((item) =>
          item.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      );
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults([]); // 오류 발생 시 결과를 비웁니다
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  // 검색어 변경 시 API 호출
  useEffect(() => {
    if (query.length >= 2) {
      // 입력된 문자가 2개 이상일 때만 검색
      fetchProducts(query); // API 호출
    } else {
      setResults([]); // 입력이 2글자 미만일 때는 결과를 비웁니다
    }
  }, [query]); // `query`가 변경될 때마다 실행

  return (
    <View style={styles.container}>
      {/* 검색 입력창 */}
      <TextInput
        style={styles.searchInput}
        placeholder="검색할 제품명을 입력해주세요"
        value={query}
        onChangeText={(text) => setQuery(text)} // 입력값을 상태에 저장
        returnKeyType="search" // '완료' 버튼을 '검색' 버튼으로 설정
        onSubmitEditing={() => fetchProducts(query)} // 'Enter' 키를 눌렀을 때 검색 실행
      />
      {loading && <Text>Loading...</Text>}
      {/* 검색 결과 리스트 */}
      <FlatList
        data={results}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.resultItem}
            onPress={() => {
              // 검색 결과 클릭 시 상품 상세 페이지로 이동
              navigation.navigate('ProductScreen', { productId: item.id });
            }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()} // id를 문자열로 변환하여 고유 키 설정
      />
    </View>
  );
};

// 스타일 설정
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  resultItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default SearchScreen;
