import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/dto';
import { Product } from './entity/product.entity';
import { User } from 'src/user/entity/user.entity';
import { CurrentUser } from '../auth/current-user.decorator'; // JWT 토큰으로 인증된 사용자 정보 가져오기
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // 상품 등록
  @Post()
  @UseGuards(JwtAuthGuard) // 인증된 사용자만 접근
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: 5 }], {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: { images?: Express.Multer.File[] },
    @CurrentUser() user: User, // JWT 토큰으로 사용자 정보 가져오기
  ): Promise<Product> {
    const images = files?.images?.map((file) => file.path) || [];
    // console.log(images);
    // console.log('Files:', files); // 업로드된 파일 확인
    // console.log('Body:', createProductDto); // 전달된 데이터 확인
    return this.productService.createProduct(createProductDto, user, images);
  }

  // 상품 목록 조회
  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  // 특정 상품 조회
  @Get(':id')
  async getProduct(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

//   // 상품 수정
//   @Put(':id')
//   @UseGuards(JwtAuthGuard) // 인증된 사용자만 접근
//   @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
//   async updateProduct(
//     @Param('id') id: number,
//     @Body() updateProductDto: UpdateProductDto,
//     @UploadedFiles() files: { images?: Express.Multer.File[] },
//   ): Promise<Product> {
//     const images = files?.images?.map((file) => file.path) || [];
//     updateProductDto.images = images;
//     return this.productService.updateProduct(id, updateProductDto);
//   }

  // 상품 삭제
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteProduct(@Param('id') id: number): Promise<void> {
    await this.productService.removeProduct(id);
  }
}
