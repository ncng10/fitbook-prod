import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from './User';

@ObjectType()
@Entity()
export class Group extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({ unique: true })
    groupName!: string;

    @Field()
    @Column()
    groupCategory!: string;

    @Field()
    @Column()
    creatorId: number;

    //creator can have 0-n groups
    @ManyToOne(() => User, (user) => user.groups, { nullable: true })
    creator: User;

    @ManyToMany(() => User)
    @JoinTable()
    members: User[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}