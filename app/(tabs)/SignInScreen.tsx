import { SignIn } from '@/api/Auth';
import Header from '@/components/Header';
import { GRAY } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';

const SignInScreen = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isIdFocused, setIsIdFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Header />,
    });
  }, [navigation]);

  const onSubmit = async () => {
    Keyboard.dismiss();
    try {
      const user = await SignIn({ email: id, password });
      console.log('로그인 성공:', user);

      // 로그인 성공 시 ProfileScreen으로 이동하되 하단 탭은 유지
      navigation.navigate('ProfileScreen');
    } catch (error) {
      console.log('로그인 실패:', error.message);
      // 에러 메시지 표시 로직 추가
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          { borderColor: isIdFocused ? GRAY.DARK : GRAY.DEFAULT },
        ]}
        placeholder="아이디 입력"
        value={id}
        onChangeText={setId}
        onFocus={() => setIsIdFocused(true)}
        onBlur={() => setIsIdFocused(false)}
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => passwordInputRef.current?.focus()}
      />
      <TextInput
        ref={passwordInputRef}
        style={[
          styles.input,
          { borderColor: isPasswordFocused ? GRAY.DARK : GRAY.DEFAULT },
        ]}
        placeholder="비밀번호 입력"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        onFocus={() => setIsPasswordFocused(true)}
        onBlur={() => setIsPasswordFocused(false)}
        keyboardType="default"
        returnKeyType="done"
      />
      <TouchableOpacity style={styles.loginButton} onPress={onSubmit}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => {
          navigation.navigate('SignUpScreen');
        }}
      >
        <Text style={styles.signupButtonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 12,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  signupButton: {
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default SignInScreen;
