import { Controller, Get } from '@nestjs/common';
import { CrawlService } from './crawl.service';

@Controller('crawl')
export class CrawlController {
  constructor(private readonly crawlService: CrawlService) {}

  @Get('hypertension')
  async getHypertensionData() {
    return this.crawlService.getHypertensionData();
  }

  @Get('diabetes')
  async getDiabetesData() {
    return this.crawlService.getDiabetesData();
  }
}
