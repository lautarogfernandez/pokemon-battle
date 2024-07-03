import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
  ) {}

  async findAll(): Promise<Pokemon[]> {
    return await this.pokemonRepository.find();
  }

  async findOne(id: string): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOne({ where: { id: id } });
    if (!pokemon) {
      throw new NotFoundException(`Pokemon with ID ${id} not found`);
    }
    return pokemon;
  }

  async getWinner(pokemonId1: string, pokemonId2: string): Promise<Pokemon> {
    const pokemon1 = await this.pokemonRepository.findOne({
      where: { id: pokemonId1 },
    });
    const pokemon2 = await this.pokemonRepository.findOne({
      where: { id: pokemonId2 },
    });

    const starter = this.getStarter(pokemon1, pokemon2);
    const last = starter == pokemon1 ? pokemon2 : pokemon1;

    let battleEnd = false;
    let winner: Pokemon | undefined = undefined;

    while (!battleEnd) {
      last.recieveAttack(starter);
      if (last.isDead) {
        battleEnd = true;
        winner = starter;
      } else {
        starter.recieveAttack(last);
        if (starter.isDead()) {
          battleEnd = true;
          winner = last;
        }
      }
    }

    return winner;
  }

  private getStarter(p1: Pokemon, p2: Pokemon): Pokemon {
    return p1.speed >= p2.speed ? p1 : p2;
  }
}
