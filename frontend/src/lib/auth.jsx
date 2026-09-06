import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "campusconnect.session";
const TOKEN_KEY = "token";
const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const token = window.localStorage.getItem(TOKEN_KEY);

      if (raw && token) {
        setUser(JSON.parse(raw));
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(TOKEN_KEY);
    }

    setReady(true);
  }, []);

  const login = useCallback((authResponse) => {
    const role = String(authResponse.role || "").toLowerCase();

    const next = {
      id: authResponse.userId,
      name: authResponse.name,
      email: authResponse.email,
      role,
      identifier: "",
      profileId: authResponse.profileId ?? null,
      department: "",
      extra: {},
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.localStorage.setItem(TOKEN_KEY, authResponse.token);
    window.localStorage.setItem("role", role);
    window.localStorage.setItem("user", JSON.stringify(next));

    setUser(next);
    return next;
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem("role");
    window.localStorage.removeItem("user");
    setUser(null);
  }, []);

  const updateUser = useCallback((patch) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.localStorage.setItem("user", JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ user, ready, login, logout, updateUser }),
    [user, ready, login, logout, updateUser],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export const dashboardPath = (role) => `/${role}/dashboard`;
