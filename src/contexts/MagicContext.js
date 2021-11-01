import { createContext, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import { Magic } from "magic-sdk";
import { magicConfig } from "../config";
import { OAuthExtension } from "@magic-ext/oauth";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: "magic",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const magic = new Magic(magicConfig.publicKey);
  useEffect(() => {
    const initialize = async () => {
      try {
        await magic.user.isLoggedIn().then((isLoggedIn) => {
          console.log({ isLoggedIn });
          if (isLoggedIn) {
            magic.user.getMetadata().then((userdata) => {
              dispatch({
                type: "INITIALIZE",
                payload: {
                  isAuthenticated: true,
                  user: userdata,
                },
              });
            });
          } else {
            dispatch({
              type: "INITIALIZE",
              payload: {
                isAuthenticated: false,
                user: null,
              },
            });
          }
        });
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: { isAuthenticated: false, user: null },
        });
      }
    };
    initialize();
  }, []);

  const login = async ({ email }) => {
    try {
      await magic.auth.loginWithMagicLink({
        email,
        showUI: true,
      });
      const user = await magic.user.getMetadata();
      dispatch({ type: "LOGIN", payload: { isAuthenticated: true, user } });
    } catch (error) {
      console.log(error);
    }
    // await auth0Client.loginWithPopup();
    // const isAuthenticated = await auth0Client.isAuthenticated();
    // if (isAuthenticated) {
    //   const user = await auth0Client.getUser();
    //   dispatch({ type: "LOGIN", payload: { user } });
    // }
  };

  const logout = () => {
    magic.user.logout();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "magic",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
