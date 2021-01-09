import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { GroupMembers } from "./GroupMembers";
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
    @Field(() => User)
    @ManyToOne(() => User, (user) => user.groups)
    creator: User;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => GroupMembers, (gb) => gb.group)
    memberConnection: Promise<GroupMembers[]>;

}