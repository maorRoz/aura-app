import { Category } from './Category';

export type App = {
  id: number;
  name: string;
  category: Category;
  externalId: string;
  rating: number;
  installCount: number;
  description: string;
  url: string;
  publisher: string;
  icon: string;
  minAge: number;
};
