import { Article } from './../models/article.model';
import { Args, Query, Resolver } from "@nestjs/graphql";
import { ArticleService } from '../article.service';
import { ArticlesPagination, ArticlesPaginationArgs } from '../dto/articles-pagination.dto';

@Resolver(Article)
export class ArticleQueryResolver {
    constructor(private readonly ArticleService : ArticleService){}

    @Query(() => ArticlesPagination)
    async articlesPagination(@Args() args: ArticlesPaginationArgs){
        return this.ArticleService.articlesPagination(args);
    }

}