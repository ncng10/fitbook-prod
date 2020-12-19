import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Exercise } from "./Exercise";
import { Workout } from "./Workout";

@ObjectType()
@Entity()
export class WorkoutExercises extends BaseEntity {
    @Field()
    @PrimaryColumn()
    exerciseId: number;

    @Field()
    @PrimaryColumn()
    workoutId: number;

    @ManyToOne(() => Exercise, (exercise) => exercise.workoutConnection, { nullable: true })
    @JoinColumn({ name: "exerciseId" })
    exercise: Promise<Exercise>;

    @ManyToOne(() => Workout, (workout) => workout.exerciseConnection, { nullable: true })
    @JoinColumn({ name: "workoutId" })
    workout: Promise<Workout>;
}