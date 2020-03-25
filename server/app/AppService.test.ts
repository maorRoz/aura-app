import pick from 'lodash/pick';
import { Test } from '@nestjs/testing';
import { AppService } from './AppService';
import { FakeRawApp, FakeApp } from '../../test-utils';
import { RawApp } from './RawApp';
import { AppsFetcher } from './AppsFetcher';
import { FakeUsersFiltersDto } from '../../test-utils/FakeUserFiltersDto';
import { UserFiltersDto } from '../dto';
import { App } from '../types';
import { Fakes } from '../../test-utils/Fakes';

jest.mock('lodash/sampleSize', () => (apps: App[]): App[] => apps.slice(0, 3));

describe('AppService', () => {
  let rawApps: RawApp[];
  let appService: AppService;

  let appsFetcher: AppsFetcher;
  beforeEach(async () => {
    rawApps = [FakeRawApp(), FakeRawApp()];

    const module = await Test.createTestingModule({
      providers: [AppsFetcher]
    }).compile();
    appsFetcher = module.get<AppsFetcher>(AppsFetcher);

    jest.spyOn(appsFetcher, 'loadApps').mockImplementation(() => rawApps);

    appService = new AppService(appsFetcher);
  });

  test('getApps', () => {
    const expectedApps = [
      {
        ...pick(rawApps[0], [
          'id',
          'name',
          'category',
          'rating',
          'description',
          'url',
          'publisher',
          'icon'
        ]),
        externalId: rawApps[0].external_id,
        installCount: rawApps[0].install_count,
        minAge: rawApps[0].min_age
      },
      {
        ...pick(rawApps[1], [
          'id',
          'name',
          'category',
          'rating',
          'description',
          'url',
          'publisher',
          'icon'
        ]),
        externalId: rawApps[1].external_id,
        installCount: rawApps[1].install_count,
        minAge: rawApps[1].min_age
      }
    ];

    expect(appService.getApps()).toEqual(expectedApps);
  });

  describe('filterApps', () => {
    let userFilters: UserFiltersDto;

    beforeEach(() => {
      userFilters = FakeUsersFiltersDto({
        birthdate: '1992-06-23T21:19:19.692Z'
      });
    });

    test('All apps follow the filters conditions', () => {
      const givenApps = [
        FakeApp({
          category: userFilters.prefferedCategories[0],
          minAge: 0,
          rating: 5
        }),
        FakeApp({
          category: userFilters.prefferedCategories[0],
          minAge: 0,
          rating: 5
        }),
        FakeApp({
          category: userFilters.prefferedCategories[1],
          minAge: 0,
          rating: 5
        }),
        FakeApp({
          category: userFilters.prefferedCategories[2],
          minAge: 0,
          rating: 5
        })
      ];

      const apps = appService.filterApps(userFilters, givenApps);

      const expectedApps = givenApps.slice(0, 3);

      expect(apps).toEqual(expectedApps);
    });

    test('some apps dont pass - category dont fit', () => {
      const givenApps = [
        FakeApp({
          category: Fakes.category(userFilters.prefferedCategories),
          minAge: 0,
          rating: 5
        }),
        FakeApp({
          category: userFilters.prefferedCategories[0],
          minAge: 0,
          rating: 5
        }),
        FakeApp({
          category: userFilters.prefferedCategories[1],
          minAge: 0,
          rating: 5
        }),
        FakeApp({
          category: Fakes.category(userFilters.prefferedCategories),
          minAge: 0,
          rating: 5
        }),
        FakeApp({
          category: userFilters.prefferedCategories[2],
          minAge: 0,
          rating: 5
        })
      ];

      const apps = appService.filterApps(userFilters, givenApps);

      const expectedApps = [givenApps[1], givenApps[2], givenApps[4]];

      expect(apps).toEqual(expectedApps);
    });

    test('some apps dont pass - age too high', () => {
      const givenApps = [
        FakeApp({
          category: userFilters.prefferedCategories[0],
          minAge: 0,
          rating: 5
        }),
        FakeApp({
          category: userFilters.prefferedCategories[1],
          minAge: 29,
          rating: 5
        }),
        FakeApp({
          category: userFilters.prefferedCategories[0],
          minAge: 0,
          rating: 5
        }),
        FakeApp({
          category: userFilters.prefferedCategories[1],
          minAge: 29,
          rating: 5
        }),
        FakeApp({
          category: userFilters.prefferedCategories[2],
          minAge: 0,
          rating: 5
        })
      ];

      const apps = appService.filterApps(userFilters, givenApps);

      const expectedApps = [givenApps[0], givenApps[2], givenApps[4]];

      expect(apps).toEqual(expectedApps);
    });

    test('some apps dont pass - rating too low', () => {
      const givenApps = [
        FakeApp({
          category: userFilters.prefferedCategories[0],
          minAge: 0,
          rating: 5
        }),
        FakeApp({
          category: userFilters.prefferedCategories[0],
          minAge: 0,
          rating: 5
        }),
        FakeApp({
          category: userFilters.prefferedCategories[1],
          minAge: 0,
          rating: userFilters.rating - 1
        }),
        FakeApp({
          category: userFilters.prefferedCategories[1],
          minAge: 0,
          rating: 5
        }),
        FakeApp({
          category: userFilters.prefferedCategories[2],
          minAge: 0,
          rating: userFilters.rating - 1
        })
      ];

      const apps = appService.filterApps(userFilters, givenApps);

      const expectedApps = [givenApps[0], givenApps[1], givenApps[3]];

      expect(apps).toEqual(expectedApps);
    });

    test('some apps dont pass - two filters dont fit on the same pass', () => {
      const givenApps = [
        FakeApp({
          category: userFilters.prefferedCategories[0],
          minAge: 0,
          rating: 5
        }),
        FakeApp({
          category: userFilters.prefferedCategories[0],
          minAge: 0,
          rating: 5
        }),
        FakeApp({
          category: userFilters.prefferedCategories[0],
          minAge: 29,
          rating: 5
        }),
        FakeApp({
          category: userFilters.prefferedCategories[1],
          minAge: 0,
          rating: 5
        }),
        FakeApp({
          category: Fakes.category(userFilters.prefferedCategories),
          minAge: 0,
          rating: userFilters.rating - 1
        })
      ];

      const apps = appService.filterApps(userFilters, givenApps);

      const expectedApps = [givenApps[0], givenApps[1], givenApps[3]];

      expect(apps).toEqual(expectedApps);
    });
  });
});
