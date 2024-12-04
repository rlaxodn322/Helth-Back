import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/post.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './create-comment.dto';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async addComment(
    createCommentDto: CreateCommentDto,
    userId: number,
  ): Promise<Comment> {
    const { postId, content } = createCommentDto;

    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not Found`);
    }
    const comment = this.commentRepository.create({ content, postId, userId });
    return this.commentRepository.save(comment);
  }

  async deleteComment(id: number, userId: number): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id, userId },
    });
    if (!comment) {
      throw new NotFoundException(
        `Comment with id ${id} not found for user ${userId}`,
      );
    }
    await this.commentRepository.delete(id);
  }
  async getCommentsByPost(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { postId },
      relations: ['user'],
    });
  }
}
