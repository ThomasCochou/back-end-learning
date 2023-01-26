import { ArticleCreateInput, ArticleCreateOutput } from './article-create.dto';
import { Article } from './../models/article.model';
import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class ArticleUpdateInput extends ArticleCreateInput{}

@ObjectType()
export class ArticleUpdateOutput extends ArticleCreateOutput{}