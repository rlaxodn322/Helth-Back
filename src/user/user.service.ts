import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword); // 해시된 비밀번호 확인
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(user);
    console.log('Saved user:', savedUser); // 저장된 사용자 정보 확인
    return this.userRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password'], // 명시적으로 password를 선택
    });
  }
}
