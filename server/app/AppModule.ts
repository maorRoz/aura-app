import { Module } from '@nestjs/common';
import { AppController } from './AppController';
import { AppService } from './AppService';
import { AppsFetcher } from './AppsFetcher';

@Module({
  controllers: [AppController],
  providers: [AppsFetcher, AppService]
})
export class AppModule {}
