import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CarService } from './car.service';
import { Car } from '../../../models/second_db/car.entity';
import { Repository } from 'typeorm';

const oneCar = new Car();
(oneCar.license_plate = 'LC_OneCar_test'),
  (oneCar.qrcode_id = 'QR_OneCar_test'),
  (oneCar.province = 'PV_OneCar_test'),
  (oneCar.type = 'T_OneCar_test'),
  (oneCar.zone = 'Z_OneCar_test');
oneCar.bay = 'B_Onecar_test';

const twoCar = new Car();
(twoCar.license_plate = 'LC_twoCar_test'),
  (twoCar.qrcode_id = 'QR_twoCar_test'),
  (twoCar.province = 'PV_twoCar_test'),
  (twoCar.type = 'T_twoCar_test'),
  (twoCar.zone = 'Z_twoCar_test');
twoCar.bay = 'B_twoCar_test';

const carArray = [twoCar, oneCar];

describe('UserService', () => {
  let service: CarService;
  let repo: Repository<Car>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarService,
        {
          provide: getRepositoryToken(Car, 'second'),
          useValue: {
            create: jest.fn().mockReturnValue(oneCar),
            save: jest.fn(),
            find: jest.fn().mockResolvedValue(carArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneCar),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<CarService>(CarService);
    repo = module.get<Repository<Car>>(getRepositoryToken(Car, 'second'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findAll', () => {
    it('should return an object of car', async () => {
      const car = await service.findAll();
      expect(car).toEqual(carArray);
    });
  });
  describe('findOne', () => {
    it('should return value of first id', () => {
      const car = jest.spyOn(repo, 'findOneOrFail');
      expect(service.getOne(2)).resolves.toEqual(oneCar);
      expect(car).toBeCalledWith(2);
    });
  });
});
