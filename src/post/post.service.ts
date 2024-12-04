import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './entity/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { NotFoundError } from 'rxjs';
import { Like } from './entity/like.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
  ) {}

  async createPost(
    userId: number,
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

  async deletePost(id: number, user: User): Promise<void> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!post) {
      throw new NotFoundException('Post not Found');
    }
    if (post.user.id !== user.id) {
      throw new ForbiddenException('You are not the owner of this post');
    }
    await this.postRepository.remove(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['user'] });
  }

  async toggleLike(
    postId: number,
    userId: number,
  ): Promise<{ message: string }> {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('Post Not Found');
    }

    const existingLike = await this.likeRepository.findOne({
      where: { postId, userId },
    });
    if (existingLike) {
      await this.likeRepository.delete({ postId, userId });
      return { message: 'Like remove' };
    } else {
      await this.likeRepository.save({ postId, userId });
      return { message: 'Like added' };
    }
  }
  async getPostLikes(postId: number): Promise<number> {
    const post = await this.postRepository.findOne({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const likeCount = await this.likeRepository.count({ where: { postId } });
    return likeCount;
  }
}
