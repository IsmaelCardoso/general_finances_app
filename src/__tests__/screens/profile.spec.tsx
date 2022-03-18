import React from "react";
import { render } from "@testing-library/react-native";

import Profile from "../../screens/Profile/profile";

test("check if show correctly user input name placeholder", () => {
  const { getByPlaceholderText } = render(<Profile />);

  const inputName = getByPlaceholderText("Nome");

  expect(inputName.props.placeholder).toBeTruthy();
});

test("check if user data has benn loaded", () => {
  const { getByTestId } = render(<Profile />);

  const inputName = getByTestId("input-name");
  const inputSurname = getByTestId("input-surname");

  expect(inputName.props.value).toEqual("Ismael");
  expect(inputSurname.props.value).toEqual("Cardoso");
});
test("check if title render correctly", () => {
  const { getByTestId } = render(<Profile />);

  expect(getByTestId("text-title").children).toContain("Perfil");
});
