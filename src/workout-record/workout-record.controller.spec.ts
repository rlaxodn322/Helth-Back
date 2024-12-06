import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutRecordController } from './workout-record.controller';

describe('WorkoutRecordController', () => {
  let controller: WorkoutRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutRecordController],
    }).compile();

    controller = module.get<WorkoutRecordController>(WorkoutRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
