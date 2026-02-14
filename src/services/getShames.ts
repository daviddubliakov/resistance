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
}: {
  page: number;
  pageSize: number;
}): Promise<GetShamesResponse> {
  try {
    const response = await api.get(
      `api/shames?${POPULATE}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=date:desc`
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
