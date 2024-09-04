import { Test, TestingModule } from '@nestjs/testing';
import { GoogleauthController } from './googleauth.controller';

describe('GoogleauthController', () => {
  let controller: GoogleauthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleauthController],
    }).compile();

    controller = module.get<GoogleauthController>(GoogleauthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
