import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    recipient: string;

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

