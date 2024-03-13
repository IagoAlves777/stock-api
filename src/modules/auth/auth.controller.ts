import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { Request } from 'express';

@ApiTags('auth')
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: LoginDTO) {
    const { login, password } = user;

    return this.authService.login(login, password);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('current-user')
  async getCurrentUser(@Req() request: Request) {
    return this.authService.getCurrentUser(request.user?.id);
  }
}
