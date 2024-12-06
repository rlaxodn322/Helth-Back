import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';

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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: number, @Req() req) {
    const user = req.user;
    return this.postService.deletePost(id, user);
  }

  @Get()
  async findAll() {
    return this.postService.findAll();
  }

  @Post(':postId/like')
  @UseGuards(JwtAuthGuard)
  async toggleLike(@Param('postId') postId: number, @Req() req: any) {
    const userId = req.user.id;
    return this.postService.toggleLike(postId, userId);
  }

  @Get(':postId/like')
  async getPostLikes(@Param('postId') postId: number) {
    return { listCount: await this.postService.getPostLikes(postId) };
  }

  @Get(':postId/like/status')
  @UseGuards(JwtAuthGuard)
  async checkUserLikeStatus(@Param('postId') postId: number, @Req() req: any) {
    const userId = req.user.id;
    //console.log(postId, userId);
    return this.postService.isPostLikedByUser(postId, userId);
    //return { isLiked };
  }
}
