import React from "react";

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";

import { categories } from "../../utils/categories";

export interface TrasactionCardProps {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface Props {
  data: TrasactionCardProps;
}

const TransactionCard = ({ data }: Props) => {
  const { name, amount, date, type } = data;
  const [category] = categories.filter((item) => item.key === data.category);
  // tambem é possivel colocar "[0]" no final do código acima, já que o retorno do filter vai ser um [{}] (com 1 unico {} dentro)

  return (
    <Container>
      <Title>{name}</Title>
      <Amount type={type}>
        {type === "negative" && "- "}
        {amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>
    </Container>
  );
};

export default TransactionCard;
