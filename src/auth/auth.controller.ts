import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  //signup
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() user: SignupDto) {
    console.log('🚀 ~ AuthController ~ signup ~ user:', user);
    return this.authService.signup(user);
  }

  //logout

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    // console.log('🚀 ~ AuthController ~ login ~ loginDto:', loginDto);
    return this.authService.login(loginDto);
  }
}
