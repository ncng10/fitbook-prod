import { Ctx, Query, Resolver } from 'type-graphql'
import { DashboardFeed } from "../entities/DashboardFeed";
import { MyContext } from 'src/types';
import { getConnection } from 'typeorm';

@Resolver(DashboardFeed)
export class DashboardFeedResolver {

    @Query(() => [DashboardFeed])
    async personalFeedItems(
        @Ctx() { req }: MyContext
    ) {
        const personalFeedItems = await getConnection().query(
            `
        SELECT * FROM public.dashboard_feed
        WHERE public.dashboard_feed."creatorId" = ${req.session.userId}
        ORDER BY public.dashboard_feed.id DESC
         `
        )
        return personalFeedItems
    };

    @Query(() => [DashboardFeed])
    async friendsFeedItems(
        @Ctx() { req }: MyContext
    ) {
        const friendsFeedItems = await getConnection().query(
            `
        SELECT * FROM public.dashboard_feed
        WHERE public.dashboard_feed."creatorId" != ${req.session.userId}
        ORDER BY public.dashboard_feed.id DESC
            `
        )
        return friendsFeedItems
    };

}