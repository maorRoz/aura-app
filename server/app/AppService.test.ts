import pick from 'lodash/pick';
import { Test } from '@nestjs/testing';
import { AppService } from './AppService';
import { FakeRawApp } from '../../test-utils/FakeRawApp';
import { RawApp } from './RawApp';
import { AppsFetcher } from './AppsFetcher';

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
    //
  });
});
