import api from '.';
import type { PersonCardInfo } from '../types';

type GetDeputiesResponse = {
  data: PersonCardInfo[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

const BASE_QUERY = [
  'populate[photo][fields][0]=url',
  'populate[photo][fields][1]=formats',
  'populate[party][populate][logo][fields][0]=url',
  'populate[shames][populate][deputats][populate][photo][fields][0]=url',
  'sort[0]=lastName:asc&sort[1]=firstName:asc',
].join('&');

export async function getDeputies({
  page = 1,
  pageSize = 12,
}: {
  page: number;
  pageSize: number;
}): Promise<GetDeputiesResponse> {
  try {
    const response = await api.get(
      `/api/deputies?${BASE_QUERY}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );
    return {
      data: response.data.data ?? [],
      meta: response.data.meta ?? {
        pagination: {
          page: 1,
          pageSize,
          pageCount: 1,
          total: response.data.data?.length ?? 0,
        },
      },
    };
  } catch (error) {
    throw error;
  }
}
