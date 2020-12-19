import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Workout } from "./Workout";

@ObjectType()
@Entity()
export class Exercise extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({ nullable: true })
    workoutIdentity: number;

    @Field()
    @Column({ nullable: true })
    exerciseName: string;

    @Field()
    @Column({ nullable: true, default: "0" })
    weight: string;

    @Field()
    @Column({ nullable: true, default: "0" })
    sets: string;

    @Field()
    @Column({ nullable: true, default: "0" })
    reps: string;

    @Field()
    @Column({ nullable: true, default: "0" })
    time: string;

    @Field()
    @Column({ nullable: true, default: "0" })
    rpe: string;

    @Field()
    @Column({ nullable: true })
    notes: string;

    @Field(() => Workout)
    @ManyToOne(() => Workout, (workout) => workout.exercises)
    workout: Workout

    // @OneToMany(() => WorkoutExercises, (we) => we.exercise)
    // workoutConnection: Promise<WorkoutExercises[]>;

}