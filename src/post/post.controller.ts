import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePostDto } from './create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Request() req, @Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(req.user.id, createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updatePost(
    @Param('id') id: number,
    @Body() updatePostDto: CreatePostDto,
    @Req() req,
  ) {
    const user = req.user;
    return this.postService.updatePost(id, updatePostDto, user);
  }
  @Get()
  async findAll() {
    return this.postService.findAll();
  }
}
