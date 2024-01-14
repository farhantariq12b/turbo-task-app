import axios, { AxiosResponse } from 'axios';

class ApiClient {
  static async get<T>(url: string, params?: Record<string, string>, headers?: Record<string, string>): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.get(url, { params, headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ApiClient;