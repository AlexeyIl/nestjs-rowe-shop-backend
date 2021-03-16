import { UpdateUserFavoritesArgsGQL } from './../models/user.model';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from '../../users/services/user.service';
import { AddUserARGS, UserGQL, LoginUserARGS, TokenGQL, LoggedUserCartARGS, EmailTokenGQL, EmailArgGQL, RecoveryTokenGQL, NewPassRecoveryGQL, UpdateUserArgsGQL } from '../models/user.model';
import { AuthService } from '../../auth/auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserInterface } from '../../users/interfaces/user.interface'
import { EmailVerificationService } from '../../users/services/email-verification.service';
import { CurrentUser } from '../user.decorator';
import { UserFromTokenInterface } from '../../auth/auth.interface';

@Resolver()
export class UserResolver {
    constructor(
        private userService: UserService,
        private authService: AuthService,
        private emailVerificationService: EmailVerificationService
    ){}

    @Mutation(returns => UserGQL, {nullable: true})
    async addUser(
        @Args()user: AddUserARGS
    ) {
        return this.userService.addUser(user)
    }

    @Query(returns => UserGQL)
    @UseGuards(GqlAuthGuard)
    async getUser(
        @CurrentUser()user: UserFromTokenInterface
    ) {
        return this.userService.getUser(user.userId)
    }

    @Mutation(returns => UserGQL)
    @UseGuards(GqlAuthGuard)
    async updateCartUser(
        @Args()cart: LoggedUserCartARGS,
        @CurrentUser()user: UserFromTokenInterface
    ): Promise<UserInterface> {
        return this.userService.updateLoggedUser(user.userId, cart.cart);
    }

    @Query(returns => TokenGQL, {nullable: true})
    async loginUser(
        @Args()user: LoginUserARGS
    ) {
        return this.authService.login(user.email.toLowerCase(), user.password)
    }

    @Query(returns => Boolean)
    @UseGuards(GqlAuthGuard)
    async checkIsAdmin(
        @CurrentUser()user: UserFromTokenInterface
    ) {
        return this.userService.checkIsAdmin(user.userId)
    }

    @Query(returns => UserGQL, {nullable: true})
    async verifyEmail(
        @Args()args: EmailTokenGQL
    ) {
        return this.emailVerificationService.verifyUser(args.emailToken)
    }

    @Query(returns => Boolean)
    async passwordRecoveryReq(
        @Args()args: EmailArgGQL
    ) {
        return this.userService.passwordRecoveryReq(args.email)
    }

    @Query(returns => Boolean)
    async recoveryTokenCheck(
        @Args()args: RecoveryTokenGQL
    ) {
        return this.userService.checkRecoveryToken(args.token)
    }

    @Mutation(returns => Boolean)
    async setNewPasswordByRecovery(
        @Args()args: NewPassRecoveryGQL
    ) {
        return this.userService.setNewPasswordByRecovery(args.password, args.token)
    }

    @Mutation(returns => UserGQL)
    @UseGuards(GqlAuthGuard)
    async updateUser(
        @Args()updatedUser: UpdateUserArgsGQL,
        @CurrentUser()user: UserFromTokenInterface

    ) {
        return this.userService.updateUserInfo(user.userId, updatedUser)
    }

    @Mutation(returns => UserGQL)
    @UseGuards(GqlAuthGuard)
    async updateUserFavorites(
        @Args()favorites: UpdateUserFavoritesArgsGQL,
        @CurrentUser()user: UserFromTokenInterface
    ): Promise<UserInterface> {
        return this.userService.updateUserFavorites(user.userId, favorites.codes)
    }
}