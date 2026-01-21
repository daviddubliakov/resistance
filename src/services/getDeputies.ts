import api from './api';
import axios from 'axios';

export async function getDeputies() {
  try {
    const query = [
      'populate[photo][fields][0]=url',
      'populate[photo][fields][1]=formats',
      'populate[party][populate][logo][fields][0]=url',
      'populate[shames][populate][deputats][populate][photo][fields][0]=url',
    ].join('&');
    const response = await api.get(`/api/deputies?${query}`);
    const deputies = response.data.data;
    return deputies;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Помилка запиту: ', error.response?.data || error.message);
    } else {
      console.log('Неочікувана помилка: ', error);
    }
  }
}
