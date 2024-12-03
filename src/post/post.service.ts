import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/User.entity';
import { NotFoundError } from 'rxjs';

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

  async updatePost(
    id: number,
    updatePostDto: CreatePostDto,
    user: User,
  ): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!post) {
      throw new NotFoundException('post Not Found');
    }
    console.log('Post User Id', post.user.id);
    console.log('Current User Id', user.id);
    if (post.user.id !== user.id) {
      throw new ForbiddenException('You are not the user of this post');
    }
    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['user'] });
  }
}
