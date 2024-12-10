import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('workout_records')
export class WorkoutRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  exerciseType: string; //운동

  @Column()
  topSetWeight: number; //목표중량
  // @Column()
  // sets: number; //수행 셋트

  // @Column()
  // weight: number; //실제 수행 중량
  @Column()
  topSetReps: number; //수행 반복 수

  @Column()
  volume: number;

  // @Column()
  // achieved: boolean; //탑세트 여부

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.workoutRecords, { onDelete: 'CASCADE' })
  user: User; // 관계 설정
}
