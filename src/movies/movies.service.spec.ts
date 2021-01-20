import { Test, TestingModule } from '@nestjs/testing';
import { title } from 'process';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Movie } from './entities/movies.entity';
import { MoviesRepository } from './movies.repository';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let repository: MoviesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService, MoviesRepository],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    repository = module.get<MoviesRepository>(MoviesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('영화 다건 조회', async () => {
    const dummyResponse = () => {
      var arr = new Array<Movie>();
      for (let i = 0; i < 3; i++) {
        let movie = new Movie();
        movie.id = i;
        arr.push(movie);
      }
      return arr;
    }

    const repositoryFindSpy = jest
      .spyOn(repository, 'find')
      .mockResolvedValue(dummyResponse());

    const res = await service.getAll();
    expect(res.length).toEqual(dummyResponse().length);
  });

  it('영화 단건 조회 : 아이디', async () => {
    const dummyResponse = () => {
      let movie = new Movie();
      movie.id = 1;
      return movie;
    }

    const repositoryFindOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(dummyResponse());

    const res = await service.getOne(1);
    expect(res.id).toEqual(dummyResponse().id);
  });

  it('영화 다건 조회 : 쿼리', async () => {
    const dummyResponse = () => {
      var arr = new Array<Movie>();
      for (let i = 0; i < 3; i++) {
        let movie = new Movie();
        movie.id = i;
        movie.title = 'testTitle';
        movie.year = 2000;
        arr.push(movie);
      }
      return arr;
    }

    const repositoryFindByTitleAndYear = jest
      .spyOn(repository, 'findByTitleAndYear')
      .mockResolvedValue(dummyResponse());

    const res = await service.getAllByQuery('testTitle', 2000);

    for (let i = 0; i < res.length; i++) {
      expect(res[i].id).toEqual(dummyResponse()[i].id);
      expect(res[i].title).toEqual(dummyResponse()[i].title);
      expect(res[i].year).toEqual(dummyResponse()[i].year);
    }
  });

  it('영화 생성 ', async () => {
    const dummyMovie = () => {
      let movie = new Movie();
      movie.id = 1;
      movie.title = 'testTitle';
      movie.year = 2000;
      return movie;
    }

    const repositorySave = jest
      .spyOn(repository, 'save')
      .mockResolvedValue(dummyMovie());

    const res = await service.create(dummyMovie());
    expect(res.id).toEqual(dummyMovie().id);
    expect(res.title).toEqual(dummyMovie().title);
    expect(res.year).toEqual(dummyMovie().year);

  });

  it('영화 수정 ', async () => {
    const dummyMovie = () => {
      let movie = new Movie();
      movie.id = 1;
      movie.title = 'testTitle';
      movie.year = 2000;
      return movie;
    }

    const dummyUpdateResult = () => {
      let updateResult = new UpdateResult();
      updateResult.affected = 1;
      return updateResult;
    }

    const repositoryFindOne = jest
    .spyOn(repository, 'findOne')
    .mockResolvedValue(dummyMovie());
    const repositoryPatch = jest
      .spyOn(repository, 'update')
      .mockResolvedValue(dummyUpdateResult());

    const res = await service.patch(1, dummyMovie());
    expect(res).toEqual(1);

    const undefinedTestMovie = dummyMovie();
    undefinedTestMovie.title = undefined;
    undefinedTestMovie.year = undefined;
    const res2 = await service.patch(1, undefinedTestMovie);
    expect(res2).toEqual(1);
  });

  it('영화 삭제 ', async () => {

    const dummyDeleteResult = () => {
      let deleteResult = new DeleteResult();
      deleteResult.affected = 1;
      return deleteResult;
    }

    const repositoryPatch = jest
      .spyOn(repository, 'delete')
      .mockResolvedValue(dummyDeleteResult());

    const res = await service.delete(1);
    expect(res).toEqual(1);
  });
});
