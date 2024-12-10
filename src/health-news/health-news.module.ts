import { Module } from '@nestjs/common';
import { HealthNewsService } from './health-news.service';
import { HealthNewsController } from './health-news.controller';

@Module({
  imports: [],
  providers: [HealthNewsService],
  controllers: [HealthNewsController],
})
export class HealthNewsModule {}
