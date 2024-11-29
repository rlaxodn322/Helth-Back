import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Request() req,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.postService.createPost(req.user, title, content);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deletePost(@Request() req, @Param('id') id: number) {
    return this.postService.deletePost(req.user, id);
  }
}
