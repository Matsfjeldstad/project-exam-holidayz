import supabase from "../lib/supabase";
import { useState, useEffect, useContext, createContext } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const auth = useProvidedAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

function useProvidedAuth() {
  const [user, setUser] = useState(null);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      return;
    }
    setUser(null);
  };

  useEffect(() => {
    // checkIfLogedIn();
    const auth = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
      }
      if (!session) {
        setUser(null);
      }
      return () => {
        auth.unsubscribe();
      };
    });
  }, []);
  return {
    user,
    signOut,
  };
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
