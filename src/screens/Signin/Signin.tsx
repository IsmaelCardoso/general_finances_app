import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

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
} from "./styles";

const Signin = () => {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSVG width={RFValue(120)} heigth={RFValue(68)} />
        </TitleWrapper>

        <Title>
          Controle suas {"\n"} finanças de forma {"\n"} muito simples
        </Title>

        <SigninTitle>
          Faça seu login {"\n"} com uma das contas abaixo
        </SigninTitle>
      </Header>

      <Footer></Footer>
    </Container>
  );
};

export default Signin;
