import { SortDirection } from './../pagination/dto/pagination.dto';
import { ArticlesPagination, ArticlesPaginationArgs } from './dto/articles-pagination.dto';
import { ArticleCreateInput, ArticleCreateOutput } from './dto/article-create.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Article } from './models/article.model';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleUpdateInput, ArticleUpdateOutput } from './dto/article-update.dto';
import { ArticleDeleteOutput } from './dto/article-delete.dto';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository : Repository<Article>
    ) {}

    async articleCreate(input: ArticleCreateInput) : Promise<ArticleCreateOutput> {
        const article = this.articleRepository.create(input);
        await article.save();
        return {article};
    }

    async articleUpdate(articleId : Article['id'], 
        input: ArticleUpdateInput) : Promise<ArticleUpdateOutput> {
        const article = await this.articleRepository.findOneOrFail(articleId);
        
        article.title = input.title;
        article.description = input.description;
        article.image = input.image;

        await article.save();
        return {article};
    }

    async articleDelete(articleId : Article['id']) : Promise<ArticleDeleteOutput> {
    const article = await this.articleRepository.findOneOrFail(articleId);

    await article.remove();
    return {articleId};
    }

    async articlesPagination(args : ArticlesPaginationArgs) : Promise<ArticlesPagination> {
        const qb = this.articleRepository.createQueryBuilder("article");
        qb.take(args.take);
        qb.skip(args.skip);
        if(args.sortBy.createAt !== null){
            qb.addOrderBy(
                "article.createdAt",
                args.sortBy.createAt === SortDirection.ASC ? "ASC" : "DESC");
        }
        if(args.sortBy.title !== null){
            qb.addOrderBy(
                "article.title",
                args.sortBy.title === SortDirection.ASC ? "ASC" : "DESC");
        }

        const [nodes, totalCount] = await qb.getManyAndCount();
        // const [nodes, totalCount] = await this.articleRepository.findAndCount({
        //     take: args.take,
        //     skip: args.skip,
        //     order: {
        //         createdAt:
        //             args.sortBy?.createAt === SortDirection.ASC ? "ASC" : "DESC",
        //         title:
        //             args.sortBy?.title === SortDirection.ASC ? "ASC" : "DESC"
        //     }
        // });
        return {
            nodes,
            totalCount
        };
        
    }
}
