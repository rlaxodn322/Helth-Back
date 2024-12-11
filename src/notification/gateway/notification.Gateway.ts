import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from '../notification.service';

@WebSocketGateway(3003, { cors: { origin: '*' } })
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly notificationService: NotificationService) {}

  afterInit() {
    console.log('Notification Gateway');
  }
  handleConnection(client: Socket) {
    console.log('Client connect', client.id);
  }
  // 클라이언트가 연결을 끊었을 때 호출
  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  // 알림을 전송하는 메서드
  sendNotification(userId: number, notificationData: any) {
    this.server.to(`user-${userId}`).emit('newNotification', notificationData);
  }

  // 클라이언트로부터 이벤트 수신 (예: 사용자가 알림을 읽었을 때)
  @SubscribeMessage('readNotification')
  handleReadNotification(@MessageBody() data: { notificationId: number }) {
    console.log('Notification read:', data.notificationId);
    // 알림을 읽음 처리할 수 있습니다.
  }
}
