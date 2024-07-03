import { Controller, Get, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon.entity';

@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  findAll(): Promise<Pokemon[]> {
    return this.pokemonService.findAll();
  }

  @Get('/battle')
  async battle(
    @Query('pokemonId1') pokemonId1,
    @Query('pokemonId2') pokemonId2,
  ): Promise<string> {
    const winner = await this.pokemonService.getWinner(pokemonId1, pokemonId2);
    return winner.id;
  }
}
