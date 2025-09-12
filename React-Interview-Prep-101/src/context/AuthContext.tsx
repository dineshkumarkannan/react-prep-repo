import { createContext, use, useContext, useEffect, useReducer } from "react";

const AuthContext = createContext(null);

const initialState = {
  isAuthenticated: false,
  user: null,
};

const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext not been set!");
  }
  return context;
};

const AuthActions = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        isAuthenticated: false,
        user: null,
      };

    default:
      state;
  }
};

const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(AuthActions, initialState);

  useEffect(() => {
    const localuser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (token && localuser) {
      dispatch({
        type: SET_USER,
        payload: localuser,
      });
    }
  }, []);

  const login = (credentials: any) => {
    if (
      credentials &&
      credentials.email === "sample@test.com" &&
      credentials.password === "123456"
    ) {
      const user = {
        name: "Demo User",
        role: "user",
        email: credentials.email,
        id: 1,
      };
      const token = "mock-jwt-token-" + Date.now();
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: SET_USER,
        payload: user,
      });
      return { success: true };
    } else {
      throw new Error("Invalid Credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT });
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
