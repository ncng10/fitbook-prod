import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Workout } from "./Workout";

@ObjectType()
@Entity()
export class Exercise extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({ nullable: true })
    workoutId: number;

    @Field()
    @Column({ nullable: true })
    exerciseName: string;

    @Field()
    @Column()
    weight: number;

    @Field()
    @Column({ nullable: true })
    sets: number;

    @Field()
    @Column({ nullable: true })
    reps: number;

    @Field()
    @Column({ nullable: true })
    time: number;

    @Field()
    @Column({ nullable: true })
    rpe: number;

    @Field()
    @Column({ nullable: true })
    notes: string;

    @Field(() => Workout)
    @ManyToOne(() => Workout, (workout) => workout.exercises)
    workout: Workout

}