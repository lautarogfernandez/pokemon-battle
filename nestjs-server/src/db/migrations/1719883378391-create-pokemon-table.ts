import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePokemonTable1719883378391 implements MigrationInterface {
  name = 'CreatePokemonTable1719883378391';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pokemons" ("id" varchar(20) PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "attack" integer NOT NULL, "defense" integer NOT NULL, "hp" integer NOT NULL, "speed" integer NOT NULL, "type" varchar(100) NOT NULL, "imageUrl" varchar NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "pokemons"`);
  }
}
