import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { environment } from './environment';
dotenvConfig({ path: '.development.env' });

const config = {
  type: 'postgres',
  database: environment.DB_NAME,
  host: environment.DB_HOST,
  port: Number(environment.DB_PORT),
  username: environment.DB_USERNAME,
  password: environment.DB_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  logging: false,
  synchronize: true,
  dropSchema: false, //! PASAR A FALSE EN PRODUCCIÓN!!!
};

// Registramos objeto de configuración con el nombre "typeorm":
export const typeOrmConfig = registerAs('typeorm', () => config);

// La línea siguiente es necesaria para poder correr las migraciones
// desde la terminal con el comando: npm run typeorm migration:run
export const connectionSource = new DataSource(config as DataSourceOptions);
