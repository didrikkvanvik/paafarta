import axios from "axios";

interface RequestConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  data?: unknown;
}

export const axiosFetch = async <T>({
  url,
  method = "GET",
  headers,
  data,
}: RequestConfig): Promise<T> => {
  try {
    const response = await axios({
      url,
      method,
      headers,
      data,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
