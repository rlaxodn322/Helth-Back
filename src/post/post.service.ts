import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/User.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async createPost(user: User, title: string, content: string): Promise<Post> {
    const post = this.postRepository.create({ user, title, content });
    return this.postRepository.save(post);
  }
  async deletePost(user: User, postId: number): Promise<void> {
    const post = await this.postRepository.findOne({
      where: { id: postId, user },
    });
    if (!post) {
      throw new HttpException('Post 없음', HttpStatus.NOT_FOUND);
    }
    await this.postRepository.remove(post);
  }
}
