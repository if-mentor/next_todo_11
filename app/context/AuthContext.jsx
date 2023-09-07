import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  const value = {
    user,
    loading,
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setUser(user);
      setLoading(false);
      if (user) {
        console.log("ログイン中");
      } else {
        console.log("ログアウト中");
      }
    });
    return () => {
      unsubscribed();
    };
  }, []);

  if (loading) {
    return (
      <>
        <p>loading...</p>
      </>
    );
  } else {
    return (
      <>
        <AuthContext.Provider value={value}>
          {!loading && children}
        </AuthContext.Provider>
      </>
    );
  }
}
