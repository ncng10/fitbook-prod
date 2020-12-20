import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Program } from "./Program";
import { Workout } from "./Workout";

@ObjectType()
@Entity()
export class ProgramWorkouts extends BaseEntity {
    @Field()
    @PrimaryColumn()
    programId: number;

    @Field()
    @PrimaryColumn()
    workoutId: number;

    @ManyToOne(() => Program, (program) => program.workoutConnection, { nullable: true })
    @JoinColumn({ name: "programId" })
    program: Promise<Program>;

    @ManyToOne(() => Workout, (workout) => workout.programConnection, { nullable: true })
    @JoinColumn({ name: "workoutId" })
    workout: Promise<Workout>;
}