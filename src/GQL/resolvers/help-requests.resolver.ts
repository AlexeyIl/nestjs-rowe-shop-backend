import { CallRequestGQL, CallRequestARGS, OilChooseRequestGQL, WholesaleRequestGQL, WholesaleRequestARGS, OilChooseRequestARGS } from './../models/help-request.model';
import { HelpRequestsService } from './../../users/services/help-requests.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelpRequestResolver {
    constructor(
        private helpRequestService: HelpRequestsService
    ) {}

    @Mutation(returns => CallRequestGQL)
    async addCallRequest(
        @Args()req: CallRequestARGS
    ) {
        return this.helpRequestService.addCallRequestDB(req)
    }

    @Mutation(returns => OilChooseRequestGQL)
    async addOilChooseRequest(
        @Args()req: OilChooseRequestARGS
    ) {
        return this.helpRequestService.addOilChooseRequestDB(req)
    }

    @Mutation(returns => WholesaleRequestGQL)
    async addWholesaleRequest(
        @Args()req: WholesaleRequestARGS
    ) {
        return this.helpRequestService.addWholesaleRequestDB(req)
    }
}