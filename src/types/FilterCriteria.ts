import { Category } from './Category';

export type FilterCriteria = {
  validCategories: Category[];
  age: number;
  minRating: number;
};
