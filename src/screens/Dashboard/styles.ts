import styled from 'styled-components/native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
    flex: 1;
    background: ${({theme}) => theme.colors.background};
`;

export const HighlightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingLeft: 24 },
})`
    position: absolute;
    margin-top: ${getStatusBarHeight() + RFValue(101)}px;
`;

export const Transactions = styled.View`
    flex: 1;
    padding: 0 24px;

    margin-top: ${RFPercentage(16)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;

export const TransactionList = styled.FlatList`

`;