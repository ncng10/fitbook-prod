import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class UserFriends extends BaseEntity {
    @Field()
    @PrimaryColumn()
    userOneIdentity: number; //user one is awlays the one who reqeusts the friendship

    @Field()
    @PrimaryColumn()
    userTwoIdentity: number;

    @Field()
    @Column()
    friendshipStatus: number; // codes: [{0: pending}, {1: friends}, {2: rejected}, {3: blocked}]

    @ManyToOne(() => User, (user) => user.friend1, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "userOneIdentity" })
    user1: Promise<User>;

    @ManyToOne(() => User, (user) => user.friend2, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "userTwoIdentity" })
    user2: Promise<User>;
}

