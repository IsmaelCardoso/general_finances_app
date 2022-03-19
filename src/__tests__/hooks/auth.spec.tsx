import { renderHook, act } from "@testing-library/react-hooks";

import { AuthProvider, useAuth } from "../../hooks/auth";

jest.mock("expo-google-app-auth", () => {
  return {
    logInAsync: () => {
      return {
        type: "success",
        user: {
          id: "any_id",
          name: "Test Test",
          email: "test@gmail.com",
          photo: "any_photo",
        },
      };
    },
  };
});

describe("Auth Hook", () => {
  it("should be able to sign in with Google account existing", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe("test@gmail.com");
  });
});
