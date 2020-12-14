import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Program extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @PrimaryGeneratedColumn()
    creatorId: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.programs)
    creator: User;

    @Field()
    @Column()
    programName: string;

    @Field()
    @Column({ nullable: true })
    programCategory: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

}
