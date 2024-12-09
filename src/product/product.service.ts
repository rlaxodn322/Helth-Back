import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/dto';
import { User } from 'src/user/entity/user.entity';

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
    const product = this.productRepository.create({
      ...createProductDto,
      user,
      images, // 이미지 파일 경로
    });
    return this.productRepository.save(product);
  }

  // 상품 목록 조회
  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  // 특정 상품 조회
  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  // 상품 수정
  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  // 상품 삭제
  async removeProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
