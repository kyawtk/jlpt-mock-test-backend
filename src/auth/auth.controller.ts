import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LocalGuard } from './local.guard';

@Controller('auth')
export class AuthController {
  //signup
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() user: SignupDto) {
    console.log('🚀 ~ AuthController ~ signup ~ user:', user);
    return this.authService.signup(user);
  }

  @UseGuards(LocalGuard)
  @Post('/login')
  login(@Request() request) {
    // console.log('🚀 ~ AuthController ~ login ~ loginDto:', loginDto);
    return this.authService.login(request.user);
  }
}
