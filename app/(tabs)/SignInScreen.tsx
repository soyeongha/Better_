import Header from '@/components/Header';
import Hr from '@/components/Hr';
import { GRAY } from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const SignInScreen = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isIdFocused, setIsIdFocused] = useState(false); // 아이디 입력란의 포커스 상태
  const [isPasswordFocused, setIsPasswordFocused] = useState(false); // 비밀번호 입력란의 포커스 상태

  const passwordInputRef = useRef<TextInput>(null); // 비밀번호 입력 칸의 ref

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Header />, // Header 컴포넌트를 헤더로 사용
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          { borderColor: isIdFocused ? GRAY.DARK : GRAY.DEFAULT },
        ]} // 포커스에 따라 borderColor 변경
        placeholder="아이디 입력"
        value={id}
        onChangeText={setId}
        onFocus={() => setIsIdFocused(true)} // 포커스 시 색상 변경
        onBlur={() => setIsIdFocused(false)} // 포커스 해제 시 색상 원래대로
        keyboardType={'email-address'}
        returnKeyType={'next'}
        onSubmitEditing={() => passwordInputRef.current?.focus()} // 다음을 누르면 비밀번호 입력 칸으로 이동
      />
      <TextInput
        ref={passwordInputRef} // 비밀번호 입력 칸 ref 설정
        style={[
          styles.input,
          { borderColor: isPasswordFocused ? GRAY.DARK : GRAY.DEFAULT },
        ]}
        placeholder="비밀번호 입력"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        onFocus={() => setIsPasswordFocused(true)} // 포커스 시 색상 변경
        onBlur={() => setIsPasswordFocused(false)} // 포커스 해제 시 색상 원래대로
        keyboardType={'default'}
        returnKeyType={'done'}
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          /* 로그인 로직 추가 */
        }}
      >
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => {
          /* 회원가입 페이지로 이동 */
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
