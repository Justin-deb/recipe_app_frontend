import { API_URL } from '../lib/constants';
import type { DataResponse } from '../types/data-response';
import type { Country } from '../types/types';

export type GetCountriesResponse = DataResponse<Country[]>;
export async function getCountries(): Promise<GetCountriesResponse> {
  const res = await fetch(`${API_URL}/country`);

  if (!res.ok) {
    return {
      error: 'No se pudieron cargar los países',
      data: null
    };
  }

  return {
    error: null,
    data: await res.json()
  };
}
