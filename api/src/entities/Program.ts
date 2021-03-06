import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProgramWorkouts } from "./ProgramWorkouts";
import { User } from "./User";

@ObjectType()
@Entity()
export class Program extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
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

    @Field()
    @Column({ nullable: true, default: false })
    isShared: boolean;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => ProgramWorkouts, (gb) => gb.workout)
    workoutConnection: Promise<ProgramWorkouts[]>;
}

