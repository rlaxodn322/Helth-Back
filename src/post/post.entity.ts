import { User } from 'src/user/User.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text') //긴 문자열 다룰 떄.
  content: string;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' }) //유저 삭제시 post 삭제
  user: User;
}
