import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutRecord } from './entity/workoutRecord.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { CreateTopSetDto } from './dto/workout.dto';

@Injectable()
export class WorkoutRecordService {
  constructor(
    @InjectRepository(WorkoutRecord)
    private readonly workoutRepository: Repository<WorkoutRecord>,
  ) {}

  async createTopSetTraining(
    user: User,
    createTopDto: CreateTopSetDto,
  ): Promise<WorkoutRecord> {
    const { exerciseType, topSetWeight, topSetReps } = createTopDto;
    const volume = topSetWeight * topSetReps;

    const newTraining = this.workoutRepository.create({
      exerciseType,
      topSetReps,
      topSetWeight,
      user,
      volume,
    });
    return await this.workoutRepository.save(newTraining);
  }
  async getUserTopSetTraining(userId: number): Promise<WorkoutRecord[]> {
    return await this.workoutRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }
  async deleteTopSetTraining(id: number, userId: number): Promise<void> {
    const training = await this.workoutRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!training) {
      throw new NotFoundException('Training record not found');
    }

    await this.workoutRepository.remove(training);
  }
}
