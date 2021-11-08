import React from 'react';
import {Text, View} from 'react-native'

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,

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
            </UserWrapper>
        </Header>
    </Container>
    );
}

export default Dashboard;