import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SignupBody } from './dto/signup-body.dto';
import { AuthLoginService } from './services/auth-login.service';
import { AuthSignupService } from './services/auth-signup.service';
import { FirebaseAuthDecodedUser } from '@/modules/auth/firebase-auth.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authSignupService: AuthSignupService,
    private readonly authLoginService: AuthLoginService
  ) {}
  @UseGuards(AuthGuard('firebase-auth'))
  @Post('/signup')
  signup(@Body() body: SignupBody) {
    return this.authSignupService.signup({ signup: body })
  }

  @UseGuards(AuthGuard('firebase-auth'))
  @Post('/login')
  async login(@Request() req: { user: FirebaseAuthDecodedUser }) {
    const { uid, email } = req.user
    return this.authLoginService.login(uid, email || "")
  }
}
