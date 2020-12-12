import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class PersonalMessage extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    recipientId: number;

    @Field()
    @Column({ nullable: true })
    senderId: number;

    @Field()
    @Column()
    sender: string;

    @Field()
    @Column({ nullable: true })
    text: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;
}

