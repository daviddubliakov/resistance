import api from '.';

export async function getShames(dynamicParams = '') {
  try {
    const response = await api.get(
      `api/shames?populate[deputats][populate]=photo&${dynamicParams}`
    );

    const shames = response.data.data;
    return shames;
  } catch (error) {
    throw error;
  }
}
