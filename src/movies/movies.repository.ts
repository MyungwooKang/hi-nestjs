import { Movie } from './entities/movies.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Movie)
export class MoviesRepository extends Repository<Movie> {
    findByTitleAndYear(title: string, year : number) {
        return this.createQueryBuilder("movie")
        .where(":title is null or movie.title = :title", {title})
        .andWhere(":year is null or movie.year = :year", {year})
        .getMany();
    };
}