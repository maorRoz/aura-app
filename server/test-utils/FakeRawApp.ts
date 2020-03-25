/* eslint-disable @typescript-eslint/camelcase */
import { RawApp } from '../app/RawApp';
import { Fakes } from './Fakes';

export const FakeRawApp = (props?: Partial<RawApp>): RawApp => ({
  id: Fakes.number(),
  name: Fakes.string(),
  category: Fakes.category(),
  external_id: Fakes.string(),
  rating: Fakes.number(),
  install_count: Fakes.number(),
  description: Fakes.string(),
  url: Fakes.route(),
  publisher: Fakes.string(),
  icon: Fakes.route(),
  min_age: Fakes.number(),
  ...props
});
