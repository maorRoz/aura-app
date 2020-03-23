import { Category } from './Category';

export type UserFiltersDto = {
  prefferedCategories: Category[];
  birthdate: string;
  rating: number;
};
