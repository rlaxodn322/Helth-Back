import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // 예시: 인증 가드 사용

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard) // 인증 필요 시 추가
  @Post()
  async getChat(@Body('message') message: string) {
    const response = await this.chatService.getChatResponse(message);
    console.log(response);
    return { botMessage: response };
  }
}
