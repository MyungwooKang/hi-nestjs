import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [ConfigModule, MoviesModule]
})
export class AppModule {}
