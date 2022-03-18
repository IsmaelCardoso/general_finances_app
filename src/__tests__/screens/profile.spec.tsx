import React from "react";
import { render } from "@testing-library/react-native";

import Profile from "../../screens/Profile/profile";

describe("Profile screen", () => {
  it("should have correctly placeholder in user name input", () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText("Nome");

    expect(inputName.props.placeholder).toBeTruthy();
  });

  it("should be load user data", () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId("input-name");
    const inputSurname = getByTestId("input-surname");

    expect(inputName.props.value).toEqual("Ismael");
    expect(inputSurname.props.value).toEqual("Cardoso");
  });

  it("should be exist title correctly", () => {
    const { getByTestId } = render(<Profile />);

    expect(getByTestId("text-title").children).toContain("Perfil");
  });
});
