import { Comment } from 'src/comment/entity/comment.entity';
import { Like } from 'src/post/entity/like.entity';
import { Post } from 'src/post/entity/post.entity';
import { WorkoutRecord } from 'src/workout-record/entity/workoutRecord.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: String;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => WorkoutRecord, (record) => record.user)
  workoutRecords: WorkoutRecord[]; // 관계명 수정
}
