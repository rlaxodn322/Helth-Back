import { Test, TestingModule } from '@nestjs/testing';
import { HealthNewsController } from './health-news.controller';

describe('HealthNewsController', () => {
  let controller: HealthNewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthNewsController],
    }).compile();

    controller = module.get<HealthNewsController>(HealthNewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
