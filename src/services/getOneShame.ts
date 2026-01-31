import api from '.';

export async function getOneShame(id: string | undefined) {
  if (!id) return null;
  try {
    const query = [
      'populate[resources][populate]=*',
      'populate[deputats][populate][photo][fields][0]=url',
      'populate[deputats][populate][shames][fields][0]=id',
      'populate[deputats][populate][party][populate][logo][fields][0]=url',
    ].join('&');

    const response = await api.get(`api/shames/${id}?${query}`);
    const shame = response.data.data;
    return shame;
  } catch (error) {
    throw error;
  }
}
