import { UseGuards } from "@nestjs/common";
import { Mutation, Resolver } from "@nestjs/graphql";
import { AuthLoginService } from "@/modules/auth/services/auth-login.service";
import { CurrentUser } from "@/decorators/current-user.decorator";
import { GqlFirebaseAuthGuard } from '@/guards/gql-firebase-auth.guard'
import { FirebaseAuthDecodedUser } from '@/modules/auth/firebase-auth.strategy'
import { Auth } from "./models/auth-login.model";

@Resolver()
export class AuthResolver {
  constructor(private readonly authLoginService: AuthLoginService) {}

  @Mutation(() => Auth)
  @UseGuards(GqlFirebaseAuthGuard)
  async login(@CurrentUser() user: FirebaseAuthDecodedUser) {
    const { uid, email } = user
    return this.authLoginService.login(uid, email || "")
  }
}
