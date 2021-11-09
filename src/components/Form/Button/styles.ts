import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    width: 100%;
    align-items: center;

    background-color: ${({ theme }) => theme.colors.secondary};

    border-radius: 5px;

    padding: ${RFValue(18)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.medium};

    color: ${({ theme }) => theme.colors.shape};
`;