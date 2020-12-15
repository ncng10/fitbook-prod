import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Group } from './Group';
import { GroupMembers } from "./GroupMembers";
import { Program } from "./Program";
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

    @OneToMany(() => Group, (program) => program.creator, { nullable: true })
    programs: Program[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => GroupMembers, (gb) => gb.member)
    groupConnection: Promise<GroupMembers[]>;


}