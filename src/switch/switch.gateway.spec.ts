import { Test, TestingModule } from '@nestjs/testing';
import { SwitchGateway } from './switch.gateway';

describe('SwitchGateway', () => {
  let gateway: SwitchGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SwitchGateway],
    }).compile();

    gateway = module.get<SwitchGateway>(SwitchGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
