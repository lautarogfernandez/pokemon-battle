import { Pokemon } from '../pokemon/pokemon.entity';
import { DataSourceOptions, DataSource } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'db.pokemons',
  synchronize: true,
  logging: true,
  entities: [Pokemon],
  migrations: ['dist/db/migrations/*.js'],
  migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
