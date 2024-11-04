import { Test, TestingModule } from '@nestjs/testing';
import { JlptService } from './jlpt.service';

describe('JlptService', () => {
  let service: JlptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JlptService],
    }).compile();

    service = module.get<JlptService>(JlptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
