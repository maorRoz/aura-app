import faker from 'faker';
import moment from 'moment';
import sample from 'lodash/sample';
import { Category, categories } from '../types';

export const Fakes = {
  number: (): number => faker.random.number(),
  boolean: (): boolean => faker.random.boolean(),
  string: (): string => faker.lorem.words(),
  dateISOstring: (): string => moment(faker.date.past()).toISOString(),
  rating: (): number => faker.random.number({ min: 1, max: 5 }),
  category: (filteredOutCategories: Category[] = []): Category =>
    sample(
      categories.filter(category => !filteredOutCategories.includes(category))
    ),
  numberOptional: (): number | undefined =>
    sample([faker.random.number(), undefined]),
  booleanOptional: (): boolean | undefined =>
    sample([faker.random.boolean(), undefined]),
  stringOptional: (): string | undefined =>
    sample([faker.lorem.words(), undefined]),
  uuid: (): string => faker.random.uuid(),
  route: (): string => `/${faker.internet.domainWord()}`
};
