import axios from "axios";
import type { IUser, UserFormPayload } from "../../interface/IUser";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000/api";

const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (typeof error.response?.data === "string") {
      return error.response.data;
    }

    if (error.response?.data?.message) {
      return error.response?.data.message as string;
    }
  }

  return "Không thể kết nối tới máy chủ. Vui lòng thử lại.";
};

export const fetchUsers = async (): Promise<IUser[]> => {
  try {
    const { data } = await http.get<IUser[]>("/users");
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const fetchUserById = async (id: number | string): Promise<IUser> => {
  try {
    const { data } = await http.get<IUser>(`/users/${id}`);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const createUser = async (payload: UserFormPayload): Promise<IUser> => {
  try {
    const { data } = await http.post<IUser>("/users", payload);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const updateUser = async (
  id: number | string,
  payload: UserFormPayload
): Promise<IUser> => {
  try {
    const { data } = await http.put<IUser>(`/users/${id}`, payload);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const deleteUser = async (id: number | string): Promise<void> => {
  try {
    await http.delete(`/users/${id}`);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
