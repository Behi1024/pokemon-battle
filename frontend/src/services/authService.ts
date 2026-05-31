import { apiPost, AUTH_URL } from "./api";
import type { AuthResponse, LoginPayload, RegisterPayload } from "../types";

export const authService = {
  register: (payload: RegisterPayload) =>
    apiPost<AuthResponse>("/api/auth/register", payload, AUTH_URL),

  login: (payload: LoginPayload) =>
    apiPost<AuthResponse>("/api/auth/login", payload, AUTH_URL),

  logout: () =>
    apiPost<AuthResponse>("/api/auth/logout", {}, AUTH_URL),
};
