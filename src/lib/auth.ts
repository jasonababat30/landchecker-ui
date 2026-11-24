import api from "./axios";
import { saveToken } from "./auth-storage";

export type AuthUser = {
  id: number;
  email: string;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

export type AuthCredentials = {
  email: string;
  password: string;
};

export async function register(
  credentials: AuthCredentials,
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    "/auth/register",
    { user: credentials },
  );

  saveToken(response.data.token);
  return response.data;
}

export async function login(
  credentials: AuthCredentials,
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    "/auth/login",
    credentials,
  );

  saveToken(response.data.token);
  return response.data;
}
