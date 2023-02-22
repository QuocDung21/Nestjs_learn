import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto'


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  signup(
    @Body() dbo: AuthDto
  ) {
    return this.authService.signup(dbo);
  }

  @Post('signin')
  signin(@Body() dbo: AuthDto) {
    return this.authService.signin(dbo);
    // return 'I am signin p'
  }

}
