import React, { useState } from "react";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from 'styled-components'

import { useAuth } from "../../hooks/auth";

import SigninSocialButton from "../../components/SigninSocialButton";

import AppleSVG from "../../assets/apple.svg";
import GoogleSVG from "../../assets/google.svg";
import LogoSVG from "../../assets/logo.svg";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SigninTitle,
  Footer,
  FooterWrapper,
} from "./styles";

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { signInWithGoogle, signInWithApple } = useAuth();
  const theme = useTheme();

  const handlerSigninWithGoogle = async () => {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possivel conectar com a conta Google");

      setIsLoading(false);
    }
  };

  const handlerSigninWithApple = async () => {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possivel conectar com a conta Apple");

      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSVG width={RFValue(120)} height={RFValue(68)} />
        </TitleWrapper>

        <Title>
          Controle suas {"\n"} finanças de forma {"\n"} muito simples
        </Title>

        <SigninTitle>
          Faça seu login {"\n"} com uma das contas abaixo
        </SigninTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SigninSocialButton
            title="Entrar com Google"
            svg={GoogleSVG}
            onPress={handlerSigninWithGoogle}
          />
          <SigninSocialButton
            title="Entrar com Apple"
            svg={AppleSVG}
            onPress={handlerSigninWithApple}
          />
        </FooterWrapper>

        {isLoading && <ActivityIndicator color={theme.colors.shape} size='large' style={{ marginTop: 18 }} />}

      </Footer>
    </Container>
  );
};

export default Signin;
