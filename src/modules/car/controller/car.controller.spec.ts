import { Test, TestingModule } from '@nestjs/testing';
import { CarService } from '../service/car.service';
import { CarController } from './car.controller';

describe('Car Controller', () => {
  let controller: CarController;
  let service: CarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarController],
      providers: [
        {
          provide: CarService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                license_plate: 'LicentTest01',
                qrcode_id: 'QrTest01',
                province: 'ProvinceTest01',
                type: 'TypeTest01',
                zone: 'ZoneTest01',
                bay: 'BayTest01',
              },
              {
                license_plate: 'LC_OneCar_test',
                qrcode_id: 'QR_OneCar_test',
                province: 'PV_OneCar_test',
                type: 'T_OneCar_test',
                zone: 'Z_OneCar_test',
                bay: 'B_Onecar_test',
              },
            ]),
            getOne: jest.fn().mockImplementation((id: number) =>
              Promise.resolve({
                license_plate: 'LicentTest01',
                qrcode_id: 'QrTest01',
                province: 'ProvinceTest01',
                type: 'TypeTest01',
                zone: 'ZoneTest01',
                bay: 'BayTest01',
                id,
              }),
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<CarController>(CarController);
    service = module.get<CarService>(CarService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getCats', () => {
    it('should get an array of cats', async () => {
      await expect(controller.findAll()).resolves.toEqual([
        {
          license_plate: 'LicentTest01',
          qrcode_id: 'QrTest01',
          province: 'ProvinceTest01',
          type: 'TypeTest01',
          zone: 'ZoneTest01',
          bay: 'BayTest01',
        },
        {
          license_plate: 'LC_OneCar_test',
          qrcode_id: 'QR_OneCar_test',
          province: 'PV_OneCar_test',
          type: 'T_OneCar_test',
          zone: 'Z_OneCar_test',
          bay: 'B_Onecar_test',
        },
      ]);
    });
  });
});
