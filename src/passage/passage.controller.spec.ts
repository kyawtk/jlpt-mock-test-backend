import { Test, TestingModule } from '@nestjs/testing';
import { PassageController } from './passage.controller';
import { PassageService } from './passage.service';

describe('PassageController', () => {
  let controller: PassageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassageController],
      providers: [PassageService],
    }).compile();

    controller = module.get<PassageController>(PassageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
