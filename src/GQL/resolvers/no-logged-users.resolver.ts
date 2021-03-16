import { Resolver, Args, Query, Mutation } from "@nestjs/graphql";
import { UserService } from '../../users/services/user.service';
import { NoLoggedUserGQL, NoLoggedUserARGS, NoLoggedUserFavARGS } from '../models/no-logged-user.model';
import { NoLoggedUserDB, NoLoggedUserInterface } from 'src/users/interfaces/no-logged-user.interface';


@Resolver()
export class NoLoggedUsersResolver {
    constructor(
        private userService: UserService
    ) {}
    
    @Query(returns => NoLoggedUserGQL, {nullable: true})
    async getNotLoggedUser(
        @Args('token')token: string
    ): Promise<NoLoggedUserDB> {
        if(token !== 'server') {
            return this.userService.checkNotLoggedUser(token)
        }
    }

    @Mutation(returns => NoLoggedUserGQL)
    async updateCart(
        @Args()user: NoLoggedUserARGS
    ): Promise<NoLoggedUserDB> {
        return this.userService.updateNotLoggedUser(user as NoLoggedUserInterface);
    }

    @Mutation(returns => NoLoggedUserGQL)
    async updateFavorites(
        @Args()user: NoLoggedUserFavARGS
    ): Promise<NoLoggedUserDB> {
        return this.userService.updateNotLoggedUserFavorites(user as NoLoggedUserInterface);
    }

}