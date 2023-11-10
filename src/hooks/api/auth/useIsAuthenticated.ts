import { useEffect, useState } from 'react';
import { auth } from '../../../static/firebase/config';

const useIsAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const isLoading = isAuthenticated === null;

  return { isAuthenticated, isLoading };
};

export default useIsAuthenticated;
