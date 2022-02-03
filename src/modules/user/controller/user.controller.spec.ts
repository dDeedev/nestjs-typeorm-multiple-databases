import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../service/user.service';
import { UserController } from './user.controller';

describe('User Controller', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              { username: 'admin 12234', password: '123456', role: 'admin' },
              {
                username: 'Username_test',
                password: 'Password_test',
                role: 'Role_test',
              },
            ]),
            getOne: jest.fn().mockImplementation((id: number) =>
              Promise.resolve({
                username: 'test Admin',
                password: 'test passmin',
                role: 'test roleadmin',
                id,
              }),
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getCats', () => {
    it('should get an array of cats', async () => {
      await expect(controller.findAll()).resolves.toEqual([
        {
          username: 'admin 12234',
          password: '123456',
          role: 'admin',
        },
        {
          username: 'Username_test',
          password: 'Password_test',
          role: 'Role_test',
        },
      ]);
    });
  });
});
