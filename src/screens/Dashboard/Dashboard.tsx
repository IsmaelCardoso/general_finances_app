import React from 'react';


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
    </Container>
    );
}

export default Dashboard;