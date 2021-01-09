import { Field, ObjectType } from "type-graphql";
import { Entity, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User"
import { Group } from "./Group";

@ObjectType()
@Entity()
export class GroupMembers extends BaseEntity {
    @Field()
    @PrimaryColumn()
    memberId: number;

    @Field()
    @PrimaryColumn()
    groupId: number;

    @ManyToOne(() => Group, (group) => group.memberConnection, { nullable: true })
    @JoinColumn({ name: "groupId" })
    group: Promise<Group>;

    @ManyToOne(() => User, (user) => user.groupConnection, { nullable: true })
    @JoinColumn({ name: "memberId" })
    member: Promise<User>;
}