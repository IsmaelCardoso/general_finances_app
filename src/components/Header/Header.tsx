import React from 'react';

import {
    Container,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    IconPower,
} from './styles';

const Header = () => {
    return (
        <Container>
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

        </Container>
    )
}

export default Header;