import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface TransactionsProps {
    type: 'up' | 'down';
    isActive: boolean;
}

export const Container = styled.TouchableOpacity<TransactionsProps>`
    width: 48%;

    flex-direction: row;
    align-items: center;
    justify-content: center;

    ${({ theme, isActive }) => !isActive && css`border: 1.5px solid ${theme.colors.text_light}`};
    border-radius: 5px;

    padding: 18px 38px;

    ${({ theme, type, isActive }) => isActive && type === 'up' && css`background-color: ${theme.colors.success_light}`}
    ${({ theme, type, isActive }) => isActive && type === 'down' && css`background-color: ${theme.colors.attention_light}`}
`;

export const Icon = styled(Feather)<Omit<TransactionsProps, 'isActive'>>`
    font-size: ${RFValue(24)}px;

    margin-right: 12px;

    color: ${({ theme, type }) => type === 'up' ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;