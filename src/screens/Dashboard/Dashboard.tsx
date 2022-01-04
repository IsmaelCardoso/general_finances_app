import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

import { useTheme } from "styled-components";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

import HighlightCard from "../../components/HighlightCard";
import TransactionCard, {
  TrasactionCardProps,
} from "../../components/Transactions/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  LogoutButton,
  IconPower,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LoadContainer,
} from "./styles";

export interface DataListProps extends TrasactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  const theme = useTheme();
  const { signOut, user } = useAuth()

  const getLastTransactionsDate = (
    collection: DataListProps[],
    type: "positive" | "negative"
  ) => {
    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      "pt-BR",
      { month: "long" }
    )}`;
  };

  const loadTransactions = async () => {
    setIsLoading(true);

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const dataKey = `@generalfinance:transactions:user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormatted: DataListProps[] = transactions.map(
      (transaction: DataListProps) => {
        if (transaction.type === "positive") {
          entriesTotal += Number(transaction.amount);
        } else {
          expensiveTotal += Number(transaction.amount);
        }

        const amount = Number(transaction.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date(transaction.date));

        const category = transaction.category;

        return { ...transaction, amount, category, date };
      }
    );

    setTransactions(transactionsFormatted);

    const lastTrasactionEntries = getLastTransactionsDate(
      transactions,
      "positive"
    );
    const lastTrasactionExpensies = getLastTransactionsDate(
      transactions,
      "negative"
    );
    const totalInterval = `01 à ${lastTrasactionEntries > lastTrasactionExpensies
      ? lastTrasactionEntries
      : lastTrasactionExpensies
      }`;

    const total = entriesTotal - expensiveTotal;
    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: lastTrasactionEntries,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: lastTrasactionExpensies,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });

    setIsLoading(false);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreeting>Olá</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <IconPower name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData?.entries?.amount}
              lastTransaction={`Última entrada dia ${highlightData.entries.lastTransaction}`}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData?.expensives?.amount}
              lastTransaction={`Última saída ${highlightData.expensives.lastTransaction}`}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData?.total?.amount}
              lastTransaction={highlightData.total.lastTransaction}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>
            <TransactionList
              data={transactions}
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }: any) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
