import React, { createContext, ReactNode, useContext } from "react";

import * as AuthSession from "expo-auth-session";

interface AuthProviderProps {
  children: ReactNode;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: IUser;
  signinWithGoogle: () => Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const user = {
    id: "62354262",
    name: "Ismael",
    email: "ismael.cardosos@gmail.com",
  };

  const signinWithGoogle = async () => {
    try {
      const CLIENT_ID =
        "20890507725-44mp3rc84jhtdviofgbhujsr7h7hpntb.apps.googleusercontent.com";
      const REDIRECT_URI = "https://auth.expo.io/@ismacard/generalfinances";
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const response = await AuthSession.startAsync({ authUrl });

      console.log("response:", response);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signinWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
