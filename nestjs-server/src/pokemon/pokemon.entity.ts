import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('pokemons')
export class Pokemon {
  @PrimaryColumn('varchar', {
    length: 20,
  })
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'attack', type: 'integer', nullable: false })
  attack: number;

  @Column({ name: 'defense', type: 'integer', nullable: false })
  defense: number;

  @Column({ name: 'hp', type: 'integer', nullable: false })
  hp: number;

  @Column({ name: 'speed', type: 'integer', nullable: false })
  speed: number;

  @Column({ name: 'type', length: 100, nullable: false })
  type: string;

  @Column({ name: 'imageUrl', nullable: false })
  imageUrl: string;

  private getDamage(attacker: Pokemon): number {
    return Math.min(attacker.attack - this.defense, 1);
  }

  recieveAttack(attacker: Pokemon): void {
    const damage = this.getDamage(attacker);
    this.hp -= damage;
  }

  isDead(): boolean {
    return this.hp <= 0;
  }
}
