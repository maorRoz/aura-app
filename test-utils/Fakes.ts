import faker from 'faker';
import sample from 'lodash/sample';
import { Category, categories } from '../server/types';

export const Fakes = {
  number: (): number => faker.random.number(),
  boolean: (): boolean => faker.random.boolean(),
  string: (): string => faker.lorem.words(),
  category: (): Category => sample(categories),
  numberOptional: (): number | undefined =>
    sample([faker.random.number(), undefined]),
  booleanOptional: (): boolean | undefined =>
    sample([faker.random.boolean(), undefined]),
  stringOptional: (): string | undefined =>
    sample([faker.lorem.words(), undefined]),
  uuid: (): string => faker.random.uuid(),
  route: (): string => `/${faker.internet.domainWord()}`
};
