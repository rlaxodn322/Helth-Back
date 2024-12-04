import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/post/entity/post.entity';
import { Comment } from './entity/comment.entity';
import { NotifiCation } from 'src/notification/entity/notification.entity';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Post, NotifiCation]),
    NotificationModule,
  ],
  providers: [CommentService, NotificationService],
  controllers: [CommentController],
})
export class CommentModule {}
