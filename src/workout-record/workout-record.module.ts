import { Module } from '@nestjs/common';
import { WorkoutRecordService } from './workout-record.service';
import { WorkoutRecordController } from './workout-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutRecord } from './entity/workoutRecord.entity';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutRecord, User])],
  providers: [WorkoutRecordService],
  controllers: [WorkoutRecordController],
})
export class WorkoutRecordModule {}
