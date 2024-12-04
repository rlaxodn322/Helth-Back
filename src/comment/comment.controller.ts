import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addComment(@Body() createCommentDto: CreateCommentDto, @Request() req) {
    const userId = req.user.id;
    return this.commentService.addComment(createCommentDto, userId);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteComment(@Param('id') id: number, @Request() req) {
    const userId = req.user.id;
    return this.commentService.deleteComment(id, userId);
  }

  @Get('post/:postId')
  async getCommentsByPost(@Param('postId') postId: number) {
    return this.commentService.getCommentsByPost(postId);
  }
}
