import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exercise } from "./Exercise";
import { Program } from "./Program";
import { ProgramWorkouts } from "./ProgramWorkouts";

@ObjectType()
@Entity()
export class Workout extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;


    @Field()
    @Column({ nullable: true })
    workoutDate: string;

    @Field()
    @Column({ nullable: true })
    creatorId: number;

    @Field()
    @Column({ nullable: true })
    workoutName: string;

    @Field()
    @Column({ nullable: true, default: false })
    workoutCompleted: boolean;

    @Field()
    @Column({ nullable: true, default: false })
    isShared: boolean;

    @Field()
    @Column({ nullable: true })
    workoutCategory: string;

    @Field(() => [Exercise])
    @OneToMany(() => Exercise, (exercises) => exercises.workout, { nullable: true })
    exercises: Exercise[]

    @OneToMany(() => ProgramWorkouts, (gb) => gb.group)
    programConnection: Promise<ProgramWorkouts[]>;

}