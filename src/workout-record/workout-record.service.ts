import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutRecord } from './entity/workoutRecord.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class WorkoutRecordService {
  constructor(
    @InjectRepository(WorkoutRecord)
    private readonly workoutRepository: Repository<WorkoutRecord>,
  ) {}

//   async createWorkoutRecord(
//     user: User,
//     exerciseType: string,
//     sets: number,
//     weight: number,
//     reps: number,
//   ): Promise<WorkoutRecord> {}
}
