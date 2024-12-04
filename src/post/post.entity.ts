import { Comment } from 'src/comment/comment.entity';
import { User } from 'src/user/User.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Column()
  userId: string;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
