import { App, FilterCriteria } from '../types';

export type Filter = (app: App, filterCriteria: FilterCriteria) => boolean;

export const categoryFilter = (
  { category }: App,
  { validCategories }: FilterCriteria
): boolean => {
  return validCategories.includes(category);
};

export const ageFilter = (
  { minAge }: App,
  { age }: FilterCriteria
): boolean => {
  return age >= minAge;
};

export const rankFilter = (
  { rating }: App,
  { minRating }: FilterCriteria
): boolean => {
  return rating >= minRating;
};
