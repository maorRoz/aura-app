import { Injectable } from '@nestjs/common';
import moment from 'moment';
import sampleSize from 'lodash/sampleSize';
import { categoryFilter, ageFilter, rankFilter, Filter } from '../filters';
import { App, FilterCriteria } from '../types';
import { UserFiltersDto } from '../dto';
import { AppsFetcher } from './AppsFetcher';

const NUMBER_OF_RANDOM_APPS_TO_PICK = 3;

@Injectable()
export class AppService {
  filters: Filter[];

  constructor(private readonly appFetcher: AppsFetcher) {
    this.filters = [categoryFilter, ageFilter, rankFilter];
  }

  private parseApps(): App[] {
    const rawApps = this.appFetcher.loadApps();
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
    return this.parseApps();
  }

  // eslint-disable-next-line class-methods-use-this
  private parseUserFiltersToFilterCriteria({
    birthdate,
    prefferedCategories,
    rating
  }: UserFiltersDto): FilterCriteria {
    const birthYear = moment(birthdate).year();
    const currentYear = moment().year();
    const age = currentYear - birthYear;

    return {
      validCategories: prefferedCategories,
      age,
      minRating: rating
    };
  }

  filterApps(userFilters: UserFiltersDto, apps: App[]): App[] {
    const filterCriteria = this.parseUserFiltersToFilterCriteria(userFilters);

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
