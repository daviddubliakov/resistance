import api from "./api";
import axios from "axios";

export async function getShames() {
  try {
    const response = await api.get(
      "api/shames?populate[deputats][populate]=photo"
    );
    const shames = response.data.data;
    return shames;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Помилка запиту: ", error.response?.data || error.message);
    } else {
      console.log("Неочікувана помилка: ", error);
    }
  }
}
