import React from 'react';
import { View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions(); // 화면의 너비를 가져옵니다.

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/BetterLogo_yellow.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.iconsContainer}>
        <Ionicons
          name="search"
          size={24}
          color="black"
          style={[styles.icon]}
          onPress={() => navigation.navigate('SearchScreen')}
        />
        <Ionicons
          name="cart"
          size={24}
          color="black"
          style={[styles.icon, { marginLeft: 5 }]}
          onPress={() => navigation.navigate('CartScreen')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'white',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   paddingHorizontal: 30, // Header의 왼쪽과 오른쪽 여백을 설정합니다.
  },
  logo: {
    width: 100,
    height: '100%',
    marginRight: 'auto', // 로고와 아이콘 사이에 자동으로 공간을 추가하여 아이콘을 오른쪽으로 밀어냅니다.
    padding: 'auto',
  },
  iconsContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // 아이콘들을 오른쪽 끝으로 밀어냅니다.
  },
  icon: {
    marginRight: 10, // 아이콘 사이의 간격을 설정합니다.
  },
});

export default Header;
