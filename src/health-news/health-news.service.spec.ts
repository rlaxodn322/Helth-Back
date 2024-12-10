import { Test, TestingModule } from '@nestjs/testing';
import { HealthNewsService } from './health-news.service';

describe('HealthNewsService', () => {
  let service: HealthNewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthNewsService],
    }).compile();

    service = module.get<HealthNewsService>(HealthNewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
