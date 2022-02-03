import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from '../../../models/first_db/user.entity';
import { Repository } from 'typeorm';

const oneUser = new User();
(oneUser.username = 'Username_One'),
  (oneUser.password = 'Password_One'),
  (oneUser.role = 'Role_One');

const twoUser = new User();
(twoUser.username = 'Username_test'),
  (twoUser.password = 'Password_test'),
  (twoUser.role = 'Role_test');

const userArray = [twoUser, oneUser];

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User, 'default'),
          useValue: {
            create: jest.fn().mockReturnValue(oneUser),
            save: jest.fn(),
            find: jest.fn().mockResolvedValue(userArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneUser),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<User>>(getRepositoryToken(User, 'default'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findAll', () => {
    it('should return an object of car', async () => {
      const user = await service.findAll();
      expect(user).toEqual(userArray);
    });
  });
});
