import React, { createContext, ReactNode, useContext, useState } from "react";

import * as AuthSession from "expo-auth-session";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

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

interface AuthrizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({} as IAuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser>({} as IUser)

  const signinWithGoogle = async () => {
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { params, type } = await AuthSession.startAsync({ authUrl }) as AuthrizationResponse;

      if (type === "success") {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
        const userInfo = await response.json();

        const { id, email, given_name, picture } = userInfo

        setUser({
          id,
          email,
          name: given_name,
          photo: picture,
        })

        console.log("userInfo:", userInfo)
      }

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
