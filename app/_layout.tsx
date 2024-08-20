// app/_layout.tsx

import React from 'react';
import { Stack } from 'expo-router';
import Tabs from './(tabs)/_layout'; // 탭 네비게이터를 불러옵니다

const RootLayout = () => {
  return (
    <Stack>
      {/* 탭 네비게이터는 스택 내에서 렌더링 */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* 추가적인 스크린들 */}
      <Stack.Screen name="ProfileScreen" options={{ title: 'Profile' }} />
      <Stack.Screen name="SignUpScreen" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="CartScreen" />
      <Stack.Screen name="SearchScreen" />
    </Stack>
  );
};

export default RootLayout;
