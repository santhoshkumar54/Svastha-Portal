import { createUser, user, userRole } from "../model/user-model";

import Cookies from "js-cookie";
import axios from "axios";

const sessionData = JSON.parse(Cookies.get("auth")??"{}");
export async function fetchUsers(): Promise<user[]> {
  try {
    const response = await axios.get<user[]>("/svastha/users", {
      headers: {
        'Authorization': `Bearer ${sessionData?.jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getRoles(): Promise<userRole[]> {
  try {
    const response = await axios.get<userRole[]>("/svastha/roles", {
      headers: {
        'Authorization': `Bearer ${sessionData?.jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function saveUser(userData: createUser): Promise<void> {
  try {
    const response = await axios.post<user>("/svastha/addUsers", userData, {
      headers: {
        'Authorization': `Bearer ${sessionData?.jwt}`,
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
