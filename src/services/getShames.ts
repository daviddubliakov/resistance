import api from '.';

export async function getShames() {
  try {
    const response = await api.get('api/shames?populate[deputats][populate]=photo');

    const shames = response.data.data;
    return shames;
  } catch (error) {
    throw error;
  }
}
