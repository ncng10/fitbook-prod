import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Group } from './Group';
import { GroupMembers } from "./GroupMembers";
import { PersonalMessage } from "./PersonalMessage";
@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({ unique: true })
    username!: string;

    @Field()
    @Column({ unique: true })
    email!: string;

    @Field()
    @Column()
    password!: string;

    //group can only have 1 creator
    @OneToMany(() => Group, (group) => group.creator)
    groups: Group[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => GroupMembers, (gb) => gb.member)
    groupConnection: Promise<GroupMembers[]>;


}