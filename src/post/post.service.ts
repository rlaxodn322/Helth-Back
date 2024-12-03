import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}
  async createPost(
    userId: string,
    createPostDto: CreatePostDto,
  ): Promise<Post> {
    const newPost = this.postRepository.create({ ...createPostDto, userId });
    return this.postRepository.save(newPost);
  }
}
