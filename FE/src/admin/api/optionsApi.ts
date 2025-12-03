import axios from "axios";
import type { IRamOption, IStorageOption, ICategoryOption } from "../../interface/IAdminProduct";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000/api";

const http = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (typeof error.response?.data === "string") return error.response.data;
    if (error.response?.data?.message) return error.response.data.message as string;
  }
  return "Không thể kết nối tới máy chủ. Vui lòng thử lại.";
};

export const fetchRams = async (): Promise<IRamOption[]> => {
  try {
    const { data } = await http.get<IRamOption[]>("/rams");
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const fetchStorages = async (): Promise<IStorageOption[]> => {
  try {
    const { data } = await http.get<IStorageOption[]>("/storages");
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const fetchCategories = async (): Promise<ICategoryOption[]> => {
  try {
    const { data } = await http.get<ICategoryOption[]>("/categories");
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
