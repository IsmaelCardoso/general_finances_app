import React from "react";
import { Alert, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

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
  const { signinWithGoogle } = useAuth();

  const handlerSigninWithGoogle = async () => {
    try {
      await signinWithGoogle();
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Não foi possivel conectar com a conta Google");
    }
  };

  console.log("User:");

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
          {/* {Platform.OS === "ios" && ( */}
          <SigninSocialButton title="Entrar com Apple" svg={AppleSVG} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
};

export default Signin;
