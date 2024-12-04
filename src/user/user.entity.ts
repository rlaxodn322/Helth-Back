import { Comment } from 'src/comment/comment.entity';
import { Post } from 'src/post/post.entity';
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
}
