import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
@ObjectType()
@Entity()
@Index(["programId", "sharedToId"], { unique: true })
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
    sharedBy: Promise<User>;

    @ManyToOne(() => User, (user) => user.friend2, { nullable: true })
    @JoinColumn({ name: "sharedById" })
    sharedTo: Promise<User>;
}