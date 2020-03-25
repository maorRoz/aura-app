import { Fakes } from './Fakes';
import { App } from '../server/types';

export const FakeApp = (props?: Partial<App>): App => ({
  id: Fakes.number(),
  name: Fakes.string(),
  category: Fakes.category(),
  externalId: Fakes.string(),
  rating: Fakes.number(),
  installCount: Fakes.number(),
  description: Fakes.string(),
  url: Fakes.route(),
  publisher: Fakes.string(),
  icon: Fakes.route(),
  minAge: Fakes.number(),
  ...props
});
