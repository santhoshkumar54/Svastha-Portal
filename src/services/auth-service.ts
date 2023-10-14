import axios from "axios";

export interface LoginForm {
    username: string;
    password: string;
}

export async function authenticate(userData: LoginForm): Promise<any> {
    try {
      const response = await axios.post<LoginForm>("/svastha/authenticate", userData);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
}