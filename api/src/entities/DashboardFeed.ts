import { MyContext } from "../types";
import { Ctx, Field, FieldResolver, ObjectType, Root } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class DashboardFeed extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    // 0: new program, 1: new workout, 2: workout completed, 3: new friend, 
    @Field()
    @Column()
    notificationKey: number;

    @Field()
    @Column()
    creatorId: number;

    @Field()
    @Column()
    user: string;

    @Field()
    @CreateDateColumn()
    date: Date;
}

