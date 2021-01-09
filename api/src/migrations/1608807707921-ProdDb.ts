import {MigrationInterface, QueryRunner} from "typeorm";

export class ProdDb1608807707921 implements MigrationInterface {
    name = 'ProdDb1608807707921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "group_members" ("memberId" integer NOT NULL, "groupId" integer NOT NULL, CONSTRAINT "PK_9628ac5e4c7b969e4becf07a77b" PRIMARY KEY ("memberId", "groupId"))`);
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "groupName" character varying NOT NULL, "groupCategory" character varying NOT NULL, "creatorId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d563ab71da3b1c915123601cb05" UNIQUE ("groupName"), CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_friends" ("userOneIdentity" integer NOT NULL, "userTwoIdentity" integer NOT NULL, "friendshipStatus" integer NOT NULL, CONSTRAINT "PK_ab8e3f46ac257fac794a6ea313a" PRIMARY KEY ("userOneIdentity", "userTwoIdentity"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "profilePicture" character varying DEFAULT '', CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "program" ("id" SERIAL NOT NULL, "creatorId" integer NOT NULL, "programName" character varying NOT NULL, "programCategory" character varying, "isShared" boolean DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3bade5945afbafefdd26a3a29fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "program_workouts" ("programId" integer NOT NULL, "workoutId" integer NOT NULL, CONSTRAINT "PK_f570dd910787446088d2772bd65" PRIMARY KEY ("programId", "workoutId"))`);
        await queryRunner.query(`CREATE TABLE "workout" ("id" SERIAL NOT NULL, "programIdentity" integer, "workoutDate" character varying, "creatorId" integer, "workoutName" character varying, "workoutCategory" character varying, "workoutCompleted" boolean DEFAULT false, "isShared" boolean DEFAULT false, CONSTRAINT "PK_ea37ec052825688082b19f0d939" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exercise" ("id" SERIAL NOT NULL, "workoutIdentity" integer, "exerciseName" character varying, "weight" character varying DEFAULT '0', "sets" character varying DEFAULT '0', "reps" character varying DEFAULT '0', "time" character varying DEFAULT '0', "rpe" character varying DEFAULT '0', "notes" character varying, "workoutId" integer, CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "personal_message" ("id" SERIAL NOT NULL, "recipientId" integer NOT NULL, "senderId" integer, "sender" character varying NOT NULL, "text" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6c97c9c74b7c446affebb265b67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "group_members" ADD CONSTRAINT "FK_1aa8d31831c3126947e7a713c2b" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_members" ADD CONSTRAINT "FK_198a0576d65b3e038bca49ac474" FOREIGN KEY ("memberId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group" ADD CONSTRAINT "FK_af184d5494395694865868b13c9" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_friends" ADD CONSTRAINT "FK_a621e9301f69cec4a36e80ff1cd" FOREIGN KEY ("userOneIdentity") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_friends" ADD CONSTRAINT "FK_ba8245f3b5a392c08bbc7b7076c" FOREIGN KEY ("userTwoIdentity") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "program" ADD CONSTRAINT "FK_72aec00f682fb0c9771c4c17f5a" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "program_workouts" ADD CONSTRAINT "FK_82f9ccfd928ade5ea02b79160dc" FOREIGN KEY ("programId") REFERENCES "program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "program_workouts" ADD CONSTRAINT "FK_9e17fe23949848240c8befc648d" FOREIGN KEY ("workoutId") REFERENCES "workout"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD CONSTRAINT "FK_e0d55aed97abd4c9a3df6ab2695" FOREIGN KEY ("workoutId") REFERENCES "workout"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercise" DROP CONSTRAINT "FK_e0d55aed97abd4c9a3df6ab2695"`);
        await queryRunner.query(`ALTER TABLE "program_workouts" DROP CONSTRAINT "FK_9e17fe23949848240c8befc648d"`);
        await queryRunner.query(`ALTER TABLE "program_workouts" DROP CONSTRAINT "FK_82f9ccfd928ade5ea02b79160dc"`);
        await queryRunner.query(`ALTER TABLE "program" DROP CONSTRAINT "FK_72aec00f682fb0c9771c4c17f5a"`);
        await queryRunner.query(`ALTER TABLE "user_friends" DROP CONSTRAINT "FK_ba8245f3b5a392c08bbc7b7076c"`);
        await queryRunner.query(`ALTER TABLE "user_friends" DROP CONSTRAINT "FK_a621e9301f69cec4a36e80ff1cd"`);
        await queryRunner.query(`ALTER TABLE "group" DROP CONSTRAINT "FK_af184d5494395694865868b13c9"`);
        await queryRunner.query(`ALTER TABLE "group_members" DROP CONSTRAINT "FK_198a0576d65b3e038bca49ac474"`);
        await queryRunner.query(`ALTER TABLE "group_members" DROP CONSTRAINT "FK_1aa8d31831c3126947e7a713c2b"`);
        await queryRunner.query(`DROP TABLE "personal_message"`);
        await queryRunner.query(`DROP TABLE "exercise"`);
        await queryRunner.query(`DROP TABLE "workout"`);
        await queryRunner.query(`DROP TABLE "program_workouts"`);
        await queryRunner.query(`DROP TABLE "program"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_friends"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "group_members"`);
    }

}
