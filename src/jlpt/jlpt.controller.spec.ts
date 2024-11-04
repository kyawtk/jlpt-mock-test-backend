import { Test, TestingModule } from '@nestjs/testing';
import { JlptController } from './jlpt.controller';

describe('JlptController', () => {
  let controller: JlptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JlptController],
    }).compile();

    controller = module.get<JlptController>(JlptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
