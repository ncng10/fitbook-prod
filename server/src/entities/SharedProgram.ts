import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../entities/User";
import { Group } from "./Group";

@ObjectType()
@Entity()
export class SharedProgram extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    sharedById: number;

    @Field()
    @Column()
    sharedToId: number;

    @Field()
    @Column()
    programId: number;

    @ManyToOne(() => User, (user) => user.friend1, { nullable: true })
    @JoinColumn({ name: "sharedToId" })
    group: Promise<Group>;

    @ManyToOne(() => User, (user) => user.friend2, { nullable: true })
    @JoinColumn({ name: "sharedById" })
    member: Promise<User>;
}