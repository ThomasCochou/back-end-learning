import { ArticleQueryResolver } from './resolvers/article.queries.resolver';
import { ArticleMutationResolver } from './resolvers/article.mutations.resolver';
import { Article } from './models/article.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';

@Module({
    imports: [TypeOrmModule.forFeature([Article])],
    providers: [ArticleService, ArticleMutationResolver, ArticleQueryResolver]
})
export class ArticleModule {}
