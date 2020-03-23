import axios, { AxiosResponse } from 'axios';
import { App, FilterCriteria } from '../../../types';

export const GetFilteredApps = (
  filterCriteria: FilterCriteria
): Promise<AxiosResponse<App[]>> => axios.post('/api/app', filterCriteria);
