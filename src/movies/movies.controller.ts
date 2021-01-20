import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(
        private readonly moviesService : MoviesService
    ) {};

    @Get()
    getAll() {
        return this.moviesService.getAll();
    }
    
    @Get("/search")
    getAllByQuery(@Query('title') title : string, @Query('year') year : number) {
        return this.moviesService.getAllByQuery(title, year);
    }

    @Get('/:id') 
    getOne(@Param('id') id : number) {
        return this.moviesService.getOne(id);
    }

    @Post()
    create(@Body() movieDto : CreateMovieDto) {
        console.log(`create request movies : ${JSON.stringify(movieDto)}`);
        return this.moviesService.create(movieDto);
    }

    @Delete('/:id')
    delete(@Param('id') id : number) {
        return this.moviesService.remove(id);
    }

    @Patch('/:id')
    patch(@Param('id') id : number, @Body() movieDto : UpdateMovieDto) {
        return this.moviesService.patch(id, movieDto);
    }
}
