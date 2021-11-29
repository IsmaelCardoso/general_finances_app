import React from "react";

import HistoryCard from "../../components/HistoryCard";

import { Container, Header, Title } from "./styles";

const Resume = () => {
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <HistoryCard title="Compras" amount="150,50" color="red" />
    </Container>
  );
};

export default Resume;
