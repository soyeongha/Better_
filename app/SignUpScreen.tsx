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

const SignUpScreen = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isIdFocused, setIsIdFocused] = useState(false); // 아이디 입력란의 포커스 상태
  const [isPasswordFocused, setIsPasswordFocused] = useState(false); // 비밀번호 입력란의 포커스 상태
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false); // 비밀번호 확인란의 포커스 상태

  const passwordInputRef = useRef<TextInput>(null); // 비밀번호 입력 칸의 ref
  const confirmPasswordInputRef = useRef<TextInput>(null); // 비밀번호 확인 칸의 ref

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Header />, // Header 컴포넌트를 헤더로 사용
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>아이디 입력</Text>
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

      <Text style={styles.label}>비밀번호 입력</Text>
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
        returnKeyType="next"
        onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
      />

      <Text style={styles.label}>비밀번호 확인</Text>
      <TextInput
        ref={confirmPasswordInputRef}
        style={[
          styles.input,
          { borderColor: isConfirmPasswordFocused ? GRAY.DARK : GRAY.DEFAULT },
        ]}
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        onFocus={() => setIsConfirmPasswordFocused(true)}
        onBlur={() => setIsConfirmPasswordFocused(false)}
        keyboardType="default"
        returnKeyType="done"
      />

      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => {
          /* 회원가입 로직 추가 */
        }}
      >
        <Text style={styles.signupButtonText}>회원가입</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          /* 로그인 페이지로 이동 */
          navigation.navigate('SignInScreen');
        }}
      >
        <Text style={styles.loginButtonText}>로그인</Text>
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
  label: {
    marginBottom: 6,
    color: GRAY.DARK,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  signupButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 12,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  loginButton: {
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default SignUpScreen;
