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
  'sort[0]=shamesCount:desc&sort[1]=lastName:asc&sort[2]=firstName:asc',
].join('&');

export async function getDeputies({
  page = 1,
  pageSize = 12,
  search = '',
  signal,
}: {
  page: number;
  pageSize: number;
  search?: string;
  signal?: AbortSignal;
}): Promise<GetDeputiesResponse> {
  try {
    let searchParam = '';
    if (search && search.trim().length > 0) {
      const searchTokens = search
        .split(' ')
        .map(token => token.trim())
        .filter(Boolean);

      const filters = searchTokens.map((token, idx) =>
        [
          `filters[$and][${idx}][$or][0][firstName][$containsi]=${encodeURIComponent(token)}`,
          `filters[$and][${idx}][$or][1][lastName][$containsi]=${encodeURIComponent(token)}`,
        ].join('&')
      );
      searchParam = `&${filters.join('&')}`;
    }
    const response = await api.get(
      `/api/deputies?${BASE_QUERY}${searchParam}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
      { signal }
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
