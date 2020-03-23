import { Injectable } from '@nestjs/common';
import moment from 'moment';
import sampleSize from 'lodash/sampleSize';
import { categoryFilter, ageFilter, rankFilter, Filter } from '../filters';
import { App, FilterCriteria, Category } from '../types';
import { UserFiltersDto } from '../dto';

type RawApp = {
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

// eslint-disable-next-line @typescript-eslint/no-var-requires
const appList: RawApp[] = require('./apps.json');

const NUMBER_OF_RANDOM_APPS_TO_PICK = 3;

@Injectable()
export class AppService {
  filters: Filter[];

  constructor() {
    this.filters = [categoryFilter, ageFilter, rankFilter];
  }

  // eslint-disable-next-line class-methods-use-this
  private parseApps(rawApps: RawApp[]): App[] {
    return rawApps.map(
      ({
        external_id: externalId,
        install_count: installCount,
        min_age: minAge,
        ...restAppProps
      }) => ({
        externalId,
        installCount,
        minAge,
        ...restAppProps
      })
    );
  }

  getApps(): App[] {
    return this.parseApps(appList);
  }

  // eslint-disable-next-line class-methods-use-this
  private parseUserFiltersToFilterCriteria({
    birthDate,
    prefferedCategories,
    rating
  }: UserFiltersDto): FilterCriteria {
    const birthYear = moment(birthDate).year();
    const currentYear = moment().year();
    const age = currentYear - birthYear;

    return {
      validCategories: prefferedCategories,
      age,
      minRating: rating
    };
  }

  filterApps(userFilters: UserFiltersDto): App[] {
    const filterCriteria = this.parseUserFiltersToFilterCriteria(userFilters);
    const apps = this.getApps();

    const filteredApps = apps.filter(app =>
      this.filters.every(filter => filter(app, filterCriteria))
    );

    const randomChosenApps = sampleSize(
      filteredApps,
      NUMBER_OF_RANDOM_APPS_TO_PICK
    );

    return randomChosenApps;
  }
}
