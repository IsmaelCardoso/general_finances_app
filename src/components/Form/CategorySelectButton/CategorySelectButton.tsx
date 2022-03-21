import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Category, Icon } from "./styles";

interface Props extends RectButtonProps {
  title: string;
  onPress: () => void;
}

const CategorySelectButton = ({ title, onPress, testID }: Props) => {
  return (
    <Container testID={testID} onPress={onPress}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};

export default CategorySelectButton;
