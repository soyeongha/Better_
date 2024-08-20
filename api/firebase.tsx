import { firebaseConfig } from '@/env';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const initFirebase = () => {
  const app = initializeApp(firebaseConfig);
  return getAuth(app);
};
