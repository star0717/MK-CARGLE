import { Test, TestingModule } from '@nestjs/testing';
import { TttController } from './ttt.controller';
import { TttService } from './ttt.service';

describe('TttController', () => {
  let controller: TttController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TttController],
      providers: [TttService],
    }).compile();

    controller = module.get<TttController>(TttController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
