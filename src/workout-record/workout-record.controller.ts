import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WorkoutRecordService } from './workout-record.service';
import { CreateTopSetDto } from './dto/workout.dto';
import { WorkoutRecord } from './entity/workoutRecord.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('workoutrecord')
export class WorkoutRecordController {
  constructor(private readonly workoutRecordService: WorkoutRecordService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async createTraining(
    @Req() req,
    @Body() createTopSetDto: CreateTopSetDto,
  ): Promise<WorkoutRecord> {
    const user = req.user.id;
    console.log(user);
    console.log(createTopSetDto);
    return this.workoutRecordService.createTopSetTraining(
      user,
      createTopSetDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserTrainings(@Req() req): Promise<WorkoutRecord[]> {
    const userId = req.user.id; // 인증된 사용자 ID
    return this.workoutRecordService.getUserTopSetTraining(userId); // 수정된 ID 사용
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTraining(@Param('id') id: number, @Req() req): Promise<void> {
    const user = req.user;
    return this.workoutRecordService.deleteTopSetTraining(id, user.id);
  }
}
