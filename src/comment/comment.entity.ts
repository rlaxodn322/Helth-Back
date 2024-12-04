import { Post } from 'src/post/post.entity';
import { User } from 'src/user/User.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  post: Post;

  @Column()
  postId: number;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;
}
