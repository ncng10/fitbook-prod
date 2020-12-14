import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    workoutCompleted: boolean;

    @Field()
    @Column({ nullable: true })
    isShared: boolean;

    @Field()
    @Column({ nullable: true })
    workoutCategory: string;
}