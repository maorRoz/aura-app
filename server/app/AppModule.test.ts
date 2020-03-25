import { Test } from '@nestjs/testing';
import request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppController } from './AppController';
import { AppService } from './AppService';
import { FakeUsersFiltersDto, FakeApp } from '../test-utils';
import { Fakes } from '../test-utils/Fakes';
import { App } from '../types';

jest.mock('./AppService');

describe('AppModule', () => {
  let app: INestApplication;
  let server: any;

  let expectedApps: App[];

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AppService],
      controllers: [AppController]
    }).compile();

    const appService = module.get<AppService>(AppService);

    expectedApps = [FakeApp(), FakeApp()];

    jest.spyOn(appService, 'filterApps').mockImplementation(() => expectedApps);

    app = module.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Validation tests', () => {
    test('invalid birthdate', async () => {
      const response = await request(server)
        .post('/app')
        .send(FakeUsersFiltersDto({ birthdate: Fakes.string() }));

      expect(response.status).toBe(400);
      expect(response.body?.message?.[0].includes('birthdate')).toEqual(true);
    });

    test('invalid prefferedCategories', async () => {
      const response = await request(server)
        .post('/app')
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        .send(FakeUsersFiltersDto({ prefferedCategories: [Fakes.string()] }));

      expect(response.status).toBe(400);
      expect(
        response.body?.message?.[0].includes('prefferedCategories')
      ).toEqual(true);
    });

    test('invalid rating', async () => {
      const response = await request(server)
        .post('/app')
        .send(FakeUsersFiltersDto({ rating: 7 }));

      expect(response.status).toBe(400);
      expect(response.body?.message?.[0].includes('rating')).toEqual(true);
    });
  });

  test('success', async () => {
    const response = await request(server)
      .post('/app')
      .send(FakeUsersFiltersDto());

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedApps);
  });
});
