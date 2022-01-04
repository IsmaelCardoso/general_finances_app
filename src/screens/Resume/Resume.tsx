import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useFocusEffect } from "@react-navigation/native";

import { addMonths, format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";

import { useAuth } from "../../hooks/auth";
import HistoryCard from "../../components/HistoryCard";

import {
  Container,
  LoadContainer,
  Header,
  Title,
  ChartContainer,
  Content,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
} from "./styles";


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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<
    totalByCategoryType[]
  >([]);

  const { user } = useAuth();

  const theme = useTheme();

  const handleChangeDate = (action: "next" | "prev") => {
    if (action === "next") {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  };

  const loadData = async () => {
    setIsLoading(false);

    const dataKey = `@generalfinance:transactions:user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const resposeFormated: TrasactionData[] = response
      ? JSON.parse(response)
      : [];

    console.log("resposeFormated", resposeFormated)

    const expensives = resposeFormated.filter(
      (expensive) =>
        expensive.type === "negative" &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
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

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
          0
        )}%`;

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
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleChangeDate("prev")}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>
              {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
            </Month>

            <MonthSelectButton onPress={() => handleChangeDate("next")}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

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
      )}
    </Container>
  );
};

export default Resume;
