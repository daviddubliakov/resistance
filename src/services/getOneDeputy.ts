import api from './api';
import axios from 'axios';

export async function getOneDeputy(id: string | undefined) {
  if (!id) return null;
  try {
    const query = [
      'populate[photo][fields][0]=url',
      'populate[photo][fields][1]=formats',
      'populate[party][populate][logo][fields][0]=url',
      'populate[shames][populate][deputats][populate][photo][fields][0]=url',
      'populate[relatedBusinessess][populate]=*',
      'populate[otherIncomes][populate]=*',
    ].join('&');

    const response = await api.get(`api/deputies/${id}?${query}`);
    const deputy = response.data.data;
    return deputy;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Помилка запиту: ', error.response?.data || error.message);
    } else {
      console.log('Неочікувана помилка: ', error);
    }
  }
}
