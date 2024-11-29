import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    // 디버깅: 비밀번호와 사용자 비밀번호 값 확인
    console.log('Received password:', password);
    console.log('User password from database:', user?.password);

    if (!user || !user.password) {
      return null; // 사용자나 비밀번호가 없으면 null 반환
    }

    // bcrypt를 이용한 비밀번호 비교
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      return result; // 비밀번호를 제외한 사용자 정보 반환
    }

    return null; // 비밀번호가 일치하지 않으면 null 반환
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
//   async validateUser(username: string, password: string): Promise<any> {
//     const user = await this.userService.findByUsername(username);
//     if (user && (await bcrypt.compare(password, user.password))) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }

//   async login(user: any) {
//     const payload = { username: user.username, sub: user.id };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
// }
