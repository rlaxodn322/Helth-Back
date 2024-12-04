import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotifiCation } from './entity/notification.entity';
import { NotificationGateway } from './gateway/notification.Gateway';

@Module({
  imports: [TypeOrmModule.forFeature([NotifiCation])],
  providers: [NotificationService, NotificationGateway],
  controllers: [NotificationController],
  exports: [NotificationGateway],
})
export class NotificationModule {}
