import { renderHook, act } from "@testing-library/react-hooks";
import { logInAsync } from "expo-google-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mocked } from "ts-jest/utils";
import { AuthProvider, useAuth } from "../../hooks/auth";

jest.mock("expo-google-app-auth");
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe("Auth Hook", () => {
  it("should be able to sign in with Google account existing", async () => {
    const googleMocked = mocked(logInAsync as any);

    /*
     * mockReturnValue pode ser reaproveitado por testes subsequentes
     * mockReturnValueOnce só pode ser utilizado por seu teste especifico
     **/
    googleMocked.mockReturnValueOnce({
      type: "success",
      user: {
        id: "any_id",
        name: "Test Test",
        email: "test@gmail.com",
        photo: "any_photo",
      },
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe("test@gmail.com");
  });

  it("user should not connect if cancel authentication with Google", async () => {
    const googleMocked = mocked(logInAsync as any);

    googleMocked.mockReturnValueOnce({
      type: "cancel",
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty("id");
  });
});
