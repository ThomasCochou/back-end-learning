import { Article } from './../models/article.model';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { ArticleCreateInput, ArticleCreateOutput } from '../dto/article-create.dto';
import { ArticleService } from './../article.service';
import { ArticleUpdateInput, ArticleUpdateOutput } from '../dto/article-update.dto';
import { ArticleDeleteOutput } from '../dto/article-delete.dto';


@Resolver(Article)
export class ArticleMutationResolver {
    constructor(private readonly ArticleService : ArticleService){}

    @Mutation(() => ArticleCreateOutput)
    async articleCreate(@Args("input") input: ArticleCreateInput,){
        return this.ArticleService.articleCreate(input);
    }

    @Mutation(() => ArticleUpdateOutput)
    async articleUpdate(@Args({name: "articleId", type: () => ID}) articleId : Article["id"],
        @Args("input") input: ArticleUpdateInput,){
        return this.ArticleService.articleUpdate(articleId, input);
    }

    @Mutation(() => ArticleDeleteOutput)
    async articleDelete(@Args({name: "articleId", type: () => ID}) articleId : Article["id"]){
        return this.ArticleService.articleDelete(articleId);
    }
}