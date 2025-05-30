import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/config/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { UserData } from '@/types/index';

export function useAuth() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const ref = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          setUser({ uid: firebaseUser.uid, ...docSnap.data() } as UserData);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { user, loading };
}
