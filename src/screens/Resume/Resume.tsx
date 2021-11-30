import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HistoryCard from "../../components/HistoryCard";

import { Container, Header, Title, Content } from "./styles";
import { categories } from "../../utils/categories";

interface TrasactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface totalByCategoryType {
  id: string;
  name: string;
  total: string;
  color: string;
}

const Resume = () => {
  const [totalByCategories, setTotalByCategories] = useState<
    totalByCategoryType[]
  >([]);

  const loadData = async () => {
    const dataKey = "@generalfinance:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const resposeFormated: TrasactionData[] = response
      ? JSON.parse(response)
      : [];

    const expensives = resposeFormated.filter(
      (expensive) => expensive.type === "negative"
    );

    const totalCategory: totalByCategoryType[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });
      if (categorySum > 0) {
        const total = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        totalCategory.push({
          id: category.key,
          name: category.name,
          color: category.color,
          total,
        });
      }
    });

    setTotalByCategories(totalCategory);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        {totalByCategories.map((category) => (
          <HistoryCard
            key={category.id}
            title={category.name}
            amount={category.total}
            color={category.color}
          />
        ))}
      </Content>
    </Container>
  );
};

export default Resume;
