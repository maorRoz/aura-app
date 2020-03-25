import { UserFiltersDto } from '../dto/UserFiltersDto';
import { Fakes } from './Fakes';

export const FakeUsersFiltersDto = (
  props?: Partial<UserFiltersDto>
): UserFiltersDto => ({
  prefferedCategories: [Fakes.category(), Fakes.category(), Fakes.category()],
  birthdate: Fakes.dateISOstring(),
  rating: Fakes.rating(),
  ...props
});
