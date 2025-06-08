import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedColumntouser1710769508333 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`otp\` VARCHAR(255)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`otpvalidupto\` VARCHAR(255)`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`otp\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`otpvalidupto\``);
    }

}
