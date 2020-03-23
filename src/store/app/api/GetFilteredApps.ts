import axios, { AxiosResponse } from 'axios';
import { App, UserFiltersDto } from '../../../types';

export const GetFilteredApps = (
  userFilters: UserFiltersDto
): Promise<AxiosResponse<App[]>> => axios.post('/api/app', userFilters);
