import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

const userStorageKey = "@generalfinance:user";

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
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  userStorageLoading: boolean;
}

interface AuthrizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({} as IAuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser>({} as IUser)
  const [userStorageLoading, setUserStorageLoading] = useState(true)

  const signInWithGoogle = async () => {
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { params, type } = await AuthSession.startAsync({ authUrl }) as AuthrizationResponse;

      if (type === "success") {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
        const userInfo = await response.json();

        const { id, email, given_name, picture } = userInfo

        const userLogged = {
          id,
          email,
          name: given_name,
          photo: picture,
        }

        setUser(userLogged)
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
      }

    } catch (error: any) {
      throw new Error(error);
    }
  };

  const signInWithApple = async () => {
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ]
      });

      if (credentials) {
        const { user, email, fullName } = credentials

        const name = fullName?.givenName;
        const photo = `https://ui-avatars.com/api/?name=${name}?length=2`

        const userLogged = {
          id: user,
          email: email!,
          name: name!,
          photo: photo,
        }

        setUser(userLogged)
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
      }

    } catch (error: any) {
      throw new Error(error)
    }
  }

  const signOut = async () => {
    setUser({} as IUser);
    await AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(userStorageKey)

      if (userStorage) {
        const userLoggerd = JSON.parse(userStorage) as IUser

        setUser(userLoggerd)
        setUserStorageLoading(false)
      }
    }

    loadUserStorageData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
        signOut,
        userStorageLoading,
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
