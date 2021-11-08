import React from 'react';
import HighlightCard from '../../components/HighlightCard';


import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    IconPower,
    HighlightCards,
} from './styles'

const Dashboard = () => {
    return (
    <Container>
        <Header>
            <UserWrapper>
                <UserInfo>
                    <Photo 
                    source={{ uri: 'https://avatars.githubusercontent.com/u/51178683?v=4'}}
                    />
                    <User>
                        <UserGreeting>Olá</UserGreeting>
                        <UserName>Ismael Cardoso</UserName>
                    </User>
                </UserInfo>

                <IconPower name='power'/>
            </UserWrapper>

        </Header>
        <HighlightCards>
            <HighlightCard 
            type="up"
            title="Entradas" 
            amount="R$ 17.400,00" 
            lastTransaction="Última entrada dia 13 de abril"
            />
            <HighlightCard 
            type="down"
            title="Saídas" 
            amount="R$ 1.259,00" 
            lastTransaction="Última saída dia 03 de abril" 
            />
            <HighlightCard 
            type="total"
            title="Total" 
            amount="R$ 16.141,00" 
            lastTransaction="01 à 16 de abril" 
            />
        </HighlightCards>
    </Container>
    );
}

export default Dashboard;