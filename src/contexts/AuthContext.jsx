import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser =
        localStorage.getItem("shopzone_user");

      return storedUser
        ? JSON.parse(storedUser)
        : null;
    } catch (error) {
      console.error(
        "Failed to load user:",
        error
      );
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(
          "shopzone_user",
          JSON.stringify(user)
        );
      } else {
        localStorage.removeItem(
          "shopzone_user"
        );
      }
    } catch (error) {
      console.error(
        "Failed to save user:",
        error
      );
    }
  }, [user]);

  const loginAsGuest = () => {
    const guestUser = {
      name: "Guest User",
      email: "guest@shopzone.dev",
      role: "guest",
    };

    setUser(guestUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(
      "shopzone_user"
    );
  };

  const isLoggedIn = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        loginAsGuest,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}