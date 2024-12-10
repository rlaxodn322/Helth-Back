import { Controller, Get } from '@nestjs/common';
import { HealthNewsService } from './health-news.service';

@Controller('health-news')
export class HealthNewsController {
  constructor(private readonly healthNewsService: HealthNewsService) {}

  @Get()
  async getHealthNews() {
    const news = await this.healthNewsService.getHealthNews();
    console.log(news);
    return { data: news };
  }
}
