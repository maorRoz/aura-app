import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './AppService';
import { App } from '../types';
import { UserFiltersDto } from '../dto';

@Controller('app')
@ApiTags('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(200)
  @Post()
  getFilteredApps(@Body() userFilters: UserFiltersDto): App[] {
    const apps = this.appService.getApps();
    return this.appService.filterApps(userFilters, apps);
  }
}
