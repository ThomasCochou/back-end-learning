import { ArgsType, Field, InputType, Int, InterfaceType, registerEnumType } from "@nestjs/graphql";
import { Node } from "../models/node.model";

export enum SortDirection {
    ASC,
    DESC,
}

registerEnumType(SortDirection, 
    {name: 'SortDirection'})

@InputType()
export class PaginationSortBy {
    @Field(() => SortDirection, { nullable: true })
    createAt?: SortDirection;
}



@ArgsType()
export class PaginationArgs {

    @Field(() => Int, { defaultValue: 0 })
    skip: number;

    @Field(() => Int, { defaultValue: 10 })
    take: number;
}

@InterfaceType()
export abstract class Pagination<N extends Node = Node> {

    @Field()
    totalCount: number;

    @Field(() => [Node])
    abstract nodes: N[];
}