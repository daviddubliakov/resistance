import api from "./api";
import axios from "axios";

export async function getDeputies() {
  try {
    const response = await api.get("api/deputies?populate=*");
    const deputies = response.data.data;
    console.log(deputies);
    return deputies;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Помилка запиту: ", error.response?.data || error.message);
    } else {
      console.log("Неочікувана помилка: ", error);
    }
  }
}
