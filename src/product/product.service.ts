import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/dto';
import { User } from 'src/user/entity/user.entity';
//import update from '../../uploads'
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // 상품 등록
  async createProduct(
    createProductDto: CreateProductDto,
    user: User,
    images: string[],
  ): Promise<Product> {
    // 이미지 경로를 '/'로 변경
    const formattedImages = images.map((image) => image.replace('\\', '/'));
    console.log(formattedImages);
    const product = this.productRepository.create({
      ...createProductDto,
      user,
      images: formattedImages, // 수정된 이미지 경로
    });
    return this.productRepository.save(product);
  }
  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();
    return products.map((product) => {
      return {
        ...product,
        images:
          product.images?.map(
            (image) =>
              `http://localhost:3001/uploads/${image.split('/').pop()}`,
          ) || [],
      };
    });
  }
  // 특정 상품 조회
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    return {
      ...product,
      images:
        product.images?.map(
          (image) => `/uploads/${image.split('/uploads/').pop()}`,
        ) || [], // 수정: 불필요한 /uploads/ 제거
    };
  }
  // 상품 삭제
  async removeProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
//   // 상품 등록
//   async createProduct(
//     createProductDto: CreateProductDto,
//     user: User,
//     images: string[],
//   ): Promise<Product> {
//     const product = this.productRepository.create({
//       ...createProductDto,
//       user,
//       images, // 이미지 파일 경로
//     });
//     return this.productRepository.save(product);
//   }

//   // 상품 목록 조회
//   async findAll(): Promise<Product[]> {
//     return this.productRepository.find();
//   }

//   // 특정 상품 조회
//   async findOne(id: number): Promise<Product> {
//     return this.productRepository.findOne({ where: { id } });
//   }

//   // 상품 수정
//   async updateProduct(
//     id: number,
//     updateProductDto: UpdateProductDto,
//   ): Promise<Product> {
//     const product = await this.productRepository.findOne({ where: { id } });
//     if (!product) {
//       throw new Error('Product not found');
//     }
//     Object.assign(product, updateProductDto);
//     return this.productRepository.save(product);
//   }

//   // 상품 삭제
//   async removeProduct(id: number): Promise<void> {
//     await this.productRepository.delete(id);
//   }
// }
