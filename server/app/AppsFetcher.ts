import { Injectable } from '@nestjs/common';
import { RawApp } from './RawApp';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const appList: RawApp[] = require('./db.json');

@Injectable()
export class AppsFetcher {
  // eslint-disable-next-line class-methods-use-this
  loadApps(): RawApp[] {
    return appList;
  }
}
