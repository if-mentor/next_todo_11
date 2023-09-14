import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  const value = {
    user,
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      // console.log(user);
      setUser(user);
    });
    return () => {
      unsubscribed();
    };
  }, [pathname]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
