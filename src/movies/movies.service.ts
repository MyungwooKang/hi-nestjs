import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movies.entity';
import { MoviesRepository } from './movies.repository';

@Injectable()
export class MoviesService {
    constructor(
        private movieRepository: MoviesRepository
    ) { };

    async getAll(): Promise<Movie[]> {
        return await this.movieRepository.find();
    }

    async getOne(id: number): Promise<Movie> {
        return await this.movieRepository.findOne(id);
    }

    async getAllByQuery(title : string, yaer : number): Promise<Movie[]> {
        return await this.movieRepository.findByTitleAndYear(title, yaer);
    }

    async create(movieDto : CreateMovieDto): Promise<Movie> {
        const newMovie = new Movie();
        newMovie.title =  movieDto.title;
        newMovie.year = movieDto.year;
    
        return await this.movieRepository.save(newMovie);
    }

    async patch(id : number, movieDto : UpdateMovieDto) : Promise<number> {
        const movie = await this.movieRepository.findOne(id);
        
        if(movieDto.title !== undefined) {
            movie.title = movieDto.title;
        }
        if(movieDto.year !== undefined) {
            movie.year = movieDto.year;
        }

        return await (await this.movieRepository.update(id, movie)).affected;
    }

    
    async delete(id: number): Promise<number> {
        return await (await this.movieRepository.delete(id)).affected;
    }
}
