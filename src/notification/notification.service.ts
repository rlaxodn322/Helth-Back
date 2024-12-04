import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotifiCation } from './entity/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotifiCation)
    private readonly notificationRepository: Repository<NotifiCation>,
  ) {}

  async createNotification(
    userId: number,
    postId: number,
    commentId: number,
    type: string,
  ): Promise<NotifiCation> {
    const notification = this.notificationRepository.create({
      userId,
      postId,
      commentId,
      type,
      isRead: false,
      createdAt: new Date(),
    });
    return this.notificationRepository.save(notification);
  }
}
