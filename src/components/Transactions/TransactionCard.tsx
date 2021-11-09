import React from 'react';

import {
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date,
} from './styles';

interface Category {
    name: string;
    icon: string;
}

interface Data {
    type: 'positive' | 'negative';
    title: string;
    amount: string;
    category: Category;
    date: string;
}

interface Props {
    data: Data;
}

const TransactionCard = ({data}: Props) => {
    const { title, amount, category, date, type } = data

    return (
        <Container>
            <Title>{title}</Title>
            <Amount type={type}>
                {type === 'negative' && '- '}
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