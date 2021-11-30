import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";

import { useTheme } from "styled-components";
import HistoryCard from "../../components/HistoryCard";

import { Container, Header, Title, ChartContainer, Content } from "./styles";
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
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

const Resume = () => {
  const [totalByCategories, setTotalByCategories] = useState<
    totalByCategoryType[]
  >([]);

  const theme = useTheme();

  const loadData = async () => {
    const dataKey = "@generalfinance:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const resposeFormated: TrasactionData[] = response
      ? JSON.parse(response)
      : [];

    const expensives = resposeFormated.filter(
      (expensive) => expensive.type === "negative"
    );

    const expensivesTotal = expensives.reduce(
      (acc: number, expensive: TrasactionData) => {
        return acc + Number(expensive.amount);
      },
      0
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
        const totalFormatted = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${(categorySum / expensivesTotal) * 100}%`;

        totalCategory.push({
          id: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent,
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
        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories.map((category) => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: "bold",
                fill: theme.colors.shape,
              },
            }}
            labelRadius={55}
            x="percent"
            y="total"
          />
        </ChartContainer>
        {totalByCategories.map((category) => (
          <HistoryCard
            key={category.id}
            title={category.name}
            amount={category.totalFormatted}
            color={category.color}
          />
        ))}
      </Content>
    </Container>
  );
};

export default Resume;
