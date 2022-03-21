import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import Register from "../../screens/Register";

import { ThemeProvider } from "styled-components/native";
import theme from "../../global/styles/theme";

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

jest.mock("@react-navigation/core", () => ({ useNavigation: () => jest.fn() }));
jest.mock("../../hooks/auth", () => ({
  useAuth: () => ({ user: { id: "any-id" } }),
}));

describe("Register Screen", () => {
  it("should be open category modal when user click on button", async () => {
    const { getByTestId } = render(<Register />, { wrapper: Providers });

    const categoryModal = getByTestId("modal-category");
    const buttonCategory = getByTestId("button-category");
    fireEvent.press(buttonCategory);

    waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
  });
});
