import styled, { css } from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native";

interface TransactionsProps {
  type: "up" | "down";
  isActive: boolean;
}

export const Container = styled.View<TransactionsProps>`
  width: 48%;

  border-width: 1.5px;
  border-style: solid;
  border-color: ${({ theme, isActive, type }) =>
    !isActive
      ? theme.colors.text_light
      : type === "down"
      ? theme.colors.attention_light
      : theme.colors.success_light};

  border-radius: 5px;

  ${({ theme, type, isActive }) =>
    isActive &&
    type === "up" &&
    css`
      background-color: ${theme.colors.success_light};
    `}
  ${({ theme, type, isActive }) =>
    isActive &&
    type === "down" &&
    css`
      background-color: ${theme.colors.attention_light};
    `}
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 18px 38px;
`;

export const Icon = styled(Feather)<Omit<TransactionsProps, "isActive">>`
  font-size: ${RFValue(24)}px;

  margin-right: 12px;

  color: ${({ theme, type }) =>
    type === "up" ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
