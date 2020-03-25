import { Category } from '../types';

export type RawApp = {
  id: number;
  name: string;
  category: Category;
  external_id: string;
  rating: number;
  install_count: number;
  description: string;
  url: string;
  publisher: string;
  icon: string;
  min_age: number;
};
