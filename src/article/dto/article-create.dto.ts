import { Article } from './../models/article.model';
import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class ArticleCreateInput {
    @Field(() => String)
    title: string;
    
    @Field(() => String)
    description: string;
    
    @Field(() => String)
    image: string;
}

@ObjectType()
export class ArticleCreateOutput {
    @Field(() => Article)
    article: Article;
}