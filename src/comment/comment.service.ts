import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entity/post.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entity/comment.entity';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationGateway } from 'src/notification/gateway/notification.Gateway';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private readonly notificationService: NotificationService,
    private readonly notificationGateway: NotificationGateway,
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
    await this.commentRepository.save(comment);

    if (post.userId !== userId) {
      await this.notificationService.createNotification(
        post.userId,
        postId,
        comment.id,
        'COMMENT',
      );
      this.notificationGateway.sendNotification(post.userId, {
        type: 'COMMENT',
        message: '새 댓글이 달렸습니다.',
        postId,
        commentId: comment.id,
      });
    }
    return comment;
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
