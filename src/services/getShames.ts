import api from '.';
import type { ShameCardInfo } from '../types';

type GetShamesResponse = {
  data: ShameCardInfo[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

const POPULATE = 'populate[deputats][populate]=photo';

export async function getShames({
  page = 1,
  pageSize = 12,
  search = '',
}: {
  page: number;
  pageSize: number;
  search?: string;
}): Promise<GetShamesResponse> {
  try {
    let searchParam = '';
    if (search && search.trim().length > 0) {
      searchParam = `&filters[$or][0][title][$containsi]=${encodeURIComponent(search)}`;
    }

    const response = await api.get(
      `api/shames?${POPULATE}${searchParam}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=date:desc`
    );

    return {
      data: response.data.data ?? [],
      meta: response.data.meta ?? {
        pagination: { page: 1, pageSize, pageCount: 1, total: response.data.data?.length ?? 0 },
      },
    };
  } catch (error) {
    throw error;
  }
}
