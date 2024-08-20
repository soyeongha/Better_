// app/api/Auth.tsx

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';

export const SignIn = async (email: string, password: string) => {
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // 로그인 후 스택 네비게이터의 ProfileScreen으로 이동
    router.push('ProfileScreen');
  } catch (error) {
    console.error(error);
  }
};
