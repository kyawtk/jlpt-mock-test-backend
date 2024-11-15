import { Test, TestingModule } from '@nestjs/testing';
import { PassageService } from './passage.service';

describe('PassageService', () => {
  let service: PassageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassageService],
    }).compile();

    service = module.get<PassageService>(PassageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
