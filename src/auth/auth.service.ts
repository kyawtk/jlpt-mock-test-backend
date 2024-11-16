import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  async verifyUser(userName: string, password: string) {
    const user = await this.userService.findOne(userName);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Incorrect password');
    }
    return user;
  }

  async signup(user: SignupDto) {
    // Check if a user with the given email or phone already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: user.email }, { phone: user.phone }],
      },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    //hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Proceed with creating the new user if no existing user is found
    try {
      const userData = await this.prisma.user.create({
        data: {
          role: 'user',
          email: user.email,
          phone: user.phone,
          password: hashedPassword,
          name: user.name,
        },
      });
      return userData;
    } catch (e) {
      throw new Error(`Error creating user: ${e.message}`);
    }
  }

  async login(user: LoginDto) {
    const userData = this.verifyUser(user.name, user.password);
    return userData;
  }
}
