import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 5px;

    padding: 17px 24px;
    margin-top: ${RFValue(16)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};

    color: ${({ theme }) => theme.colors.title};
`;

export const Amount = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.regular};

    color: ${({ theme }) => theme.colors.success};
`;

export const Footer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin-top: ${RFValue(19)}px;
`;

export const Category = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;

    color: ${({ theme }) => theme.colors.text};

`;

export const CategoryName = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.medium};

    color: ${({ theme }) => theme.colors.text};

    margin-left: 17px;
`;

export const Date = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.medium};

    color: ${({ theme }) => theme.colors.text};
`;