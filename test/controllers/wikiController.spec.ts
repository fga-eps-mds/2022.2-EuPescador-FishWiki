import { Response } from 'express';
import WikiController from '../../src/controllers/fishWikiController';
import { FishWiki } from '../../src/database/entities/fishWiki';
import { connection } from '../../src/database';
import { RequestWithUserRole } from '../../src/Interface/fishLogInterfaces';

jest.mock('../../src/utils/images');

const wikiController = new WikiController();

const wikiMock = {
  _id: '32423423565',
  largeGroup: 'couro',
  group: 'Mandís',
  commonName: 'Mandí-chumbado',
  scientificName: 'Aguarunichthys tocantinsensis',
  family: 'Pimelodidae',
  food: 'Desconhecida',
  habitat: 'Nos canais de rios com água corrente',
  maxSize: 80,
  maxWeight: 14,
  isEndemic: 'Endêmica do sistema Araguaia-Tocantins',
  isThreatened: 'Sim. Categoria Vulnerável',
  hasSpawningSeason: true,
  wasIntroduced: false,
  funFact: '',
  photo: '',
};

const mockRequestDefault = {} as RequestWithUserRole;

mockRequestDefault.body = {
  largeGroup: 'couro',
  group: 'Mandís',
  commonName: 'Mandí-chumbado',
  scientificName: 'Aguarunichthys tocantinsensis',
  family: 'Pimelodidae',
  food: 'Desconhecida',
  habitat: 'Nos canais de rios com água corrente',
  maxSize: 80,
  maxWeight: 14,
  isEndemic: 'Endêmica do sistema Araguaia-Tocantins',
  isThreatened: 'Sim. Categoria Vulnerável',
  hasSpawningSeason: true,
  wasIntroduced: false,
  funFact: '',
  photo: '',
};

const mockReq = {} as RequestWithUserRole;
mockReq.params = {};

mockReq.body = {
  largeGroup: 'couro',
  group: 'Mandís',
  commonName: 'Mandí-chumbado',
  scientificName: 'Aguarunichthys tocantinsensis',
  family: 'Pimelodidae',
  food: 'Desconhecida',
  habitat: 'Nos canais de rios com água corrente',
  maxSize: 80,
  maxWeight: 14,
  isEndemic: 'Endêmica do sistema Araguaia-Tocantins',
  isThreatened: 'Sim. Categoria Vulnerável',
  hasSpawningSeason: true,
  wasIntroduced: false,
  funFact: '',
  photo: '',
};

const mockResponse = () => {
  const response = {} as Response;
  response.status = jest.fn().mockReturnValue(response);
  response.sendStatus = jest.fn().mockReturnValue(response);
  response.json = jest.fn().mockReturnValue(response);
  return response;
};

describe('Test create Wiki function', () => {
  it('should get status code 200', async () => {
    const mockRequest = {} as RequestWithUserRole;
    const fishWikiRepository = connection.getRepository(FishWiki);

    mockRequest.body = {
      largeGroup: 'couro',
      group: 'Mandís',
      commonName: 'Mandí-chumbado',
      scientificName: 'Aguarunichthys tocantinsensis',
      family: 'Pimelodidae',
      food: 'Desconhecida',
      habitat: 'Nos canais de rios com água corrente',
      maxSize: 80,
      maxWeight: 14,
      isEndemic: 'Endêmica do sistema Araguaia-Tocantins',
      isThreatened: 'Sim. Categoria Vulnerável',
      hasSpawningSeason: true,
      wasIntroduced: false,
      funFact: '',
      photo: '',
    };

    mockRequest.user = {
      id: '32423423565',
      admin: true,
      superAdmin: true,
    };

    const response = mockResponse();
    fishWikiRepository.findOne = jest.fn();
    jest
      .spyOn(fishWikiRepository, 'save')
      .mockImplementationOnce(() => Promise.resolve({ id: 'id' }));
    const res = await wikiController.createFish(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('Should get status code 418', async () => {
    const mockRequest = {} as RequestWithUserRole;
    const fishWikiRepository = connection.getRepository(FishWiki);

    mockRequest.body = {
      group: 'Mandís',
      commonName: 'Mandí-chumbado',
      scientificName: 'Aguarunichthys tocantinsensis',
      family: 'Pimelodidae',
      food: 'Desconhecida',
      habitat: 'Nos canais de rios com água corrente',
      maxSize: 80,
      maxWeight: 14,
      isEndemic: 'Endêmica do sistema Araguaia-Tocantins',
      isThreatened: 'Sim. Categoria Vulnerável',
      hasSpawningSeason: true,
      wasIntroduced: false,
      funFact: '',
      photo: '',
    };

    mockRequest.user = {
      id: '32423423565',
      admin: true,
      superAdmin: true,
    };

    const response = mockResponse();
    fishWikiRepository.findOne = jest.fn();
    jest
      .spyOn(fishWikiRepository, 'save')
      .mockImplementationOnce(() => Promise.resolve({ id: 'id' }));
    const res = await wikiController.createFish(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(418);
  });

  it('should get status code 401', async () => {
    const mockRequest = {} as RequestWithUserRole;
    const fishWikiRepository = connection.getRepository(FishWiki);

    mockRequest.body = {
      largeGroup: 'couro',
      group: 'Mandís',
      commonName: 'Mandí-chumbado',
      scientificName: 'Aguarunichthys tocantinsensis',
      family: 'Pimelodidae',
      food: 'Desconhecida',
      habitat: 'Nos canais de rios com água corrente',
      maxSize: 80,
      maxWeight: 14,
      isEndemic: 'Endêmica do sistema Araguaia-Tocantins',
      isThreatened: 'Sim. Categoria Vulnerável',
      hasSpawningSeason: true,
      wasIntroduced: false,
      funFact: '',
      photo: '',
    };

    mockRequest.user = {
      id: '32423423565',
      admin: false,
      superAdmin: false,
    };

    const response = mockResponse();
    fishWikiRepository.findOne = jest.fn();
    jest
      .spyOn(fishWikiRepository, 'save')
      .mockImplementationOnce(() => Promise.resolve({ id: 'id' }));
    const res = await wikiController.createFish(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('should get a status code 409 if provided already used species', async () => {
    const mockRequest = {} as RequestWithUserRole;
    const fishWikiRepository = connection.getRepository(FishWiki);

    mockRequest.body = {
      largeGroup: 'couro',
      group: 'Mandís',
      commonName: 'Mandí-chumbado',
      scientificName: 'Aguarunichthys tocantinsensis',
      family: 'Pimelodidae',
      food: 'Desconhecida',
      habitat: 'Nos canais de rios com água corrente',
      maxSize: 80,
      maxWeight: 14,
      isEndemic: 'Endêmica do sistema Araguaia-Tocantins',
      isThreatened: 'Sim. Categoria Vulnerável',
      hasSpawningSeason: true,
      wasIntroduced: false,
      funFact: '',
      photo: '',
    };

    mockRequest.user = {
      id: '32423423565',
      admin: true,
      superAdmin: true,
    };

    const response = mockResponse();
    fishWikiRepository.findOne = jest.fn().mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce(wikiMock),
    }));

    jest
      .spyOn(fishWikiRepository, 'save')
      .mockImplementationOnce(() => Promise.resolve({ id: 'id' }));
    const res = await wikiController.createFish(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(409);
  });

  it('should get a status code 500 request failed', async () => {
    const response = mockResponse();
    const fishWikiRepository = connection.getRepository(FishWiki);

    fishWikiRepository.save = jest.fn().mockImplementationOnce(() => {
      throw new Error();
    });

    mockRequestDefault.user = {
      id: '32423423565',
      admin: true,
      superAdmin: true,
    };

    const res = await wikiController.createFish(mockRequestDefault, response);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Test Get All Wiki function', () => {
  it('should get all fish with a status code 200', async () => {
    const mockRequest = {} as RequestWithUserRole;
    mockRequest.query = {};

    mockRequest.user = {
      id: '32423423565',
      admin: true,
      superAdmin: true,
    };

    const response = mockResponse();
    const fishWikiRepository = connection.getRepository(FishWiki);
    const createQueryBuilder: any = {
      select: () => createQueryBuilder,
      skip: () => createQueryBuilder,
      take: () => createQueryBuilder,
      orderBy: () => createQueryBuilder,
      getMany: () => [wikiMock],
    };

    jest
      .spyOn(connection.getRepository(FishWiki), 'createQueryBuilder')
      .mockImplementation(() => createQueryBuilder);

    fishWikiRepository.createQueryBuilder().getCount = jest
      .fn()
      .mockResolvedValueOnce(1);
    const res = await wikiController.getAllFish(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('Should get all paginate fish with a status code 200', async () => {
    const mockRequest = {} as RequestWithUserRole;
    mockRequest.query = {
      count: '2',
      page: '2',
    };

    mockRequest.user = {
      id: '32423423565',
      admin: true,
      superAdmin: true,
    };

    const response = mockResponse();
    const fishWikiRepository = connection.getRepository(FishWiki);
    const createQueryBuilder: any = {
      select: () => createQueryBuilder,
      skip: () => createQueryBuilder,
      take: () => createQueryBuilder,
      orderBy: () => createQueryBuilder,
      getMany: () => [wikiMock],
    };

    jest
      .spyOn(connection.getRepository(FishWiki), 'createQueryBuilder')
      .mockImplementation(() => createQueryBuilder);

    fishWikiRepository.createQueryBuilder().getCount = jest
      .fn()
      .mockResolvedValueOnce(1);
    const res = await wikiController.getAllFish(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get all mobile fish with a status code 200', async () => {
    const mockRequest = {} as RequestWithUserRole;
    mockRequest.query = {
      mobile: 'true',
    };

    mockRequest.user = {
      id: '32423423565',
      admin: true,
      superAdmin: true,
    };

    const response = mockResponse();
    const fishWikiRepository = connection.getRepository(FishWiki);
    const createQueryBuilder: any = {
      select: () => createQueryBuilder,
      skip: () => createQueryBuilder,
      take: () => createQueryBuilder,
      orderBy: () => createQueryBuilder,
      getMany: () => [wikiMock],
    };
    jest.fn().mockResolvedValueOnce(1);
    jest
      .spyOn(connection.getRepository(FishWiki), 'createQueryBuilder')
      .mockImplementation(() => createQueryBuilder);

    fishWikiRepository.createQueryBuilder().getCount = jest.fn();
    const res = await wikiController.getAllFish(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get filtered fish with 1 parameter and a status code 200', async () => {
    const mockRequest = {} as RequestWithUserRole;
    mockRequest.query = {
      largeGroup: 'couro',
    };

    mockRequest.user = {
      id: '32423423565',
      admin: true,
      superAdmin: true,
    };

    const response = mockResponse();
    const fishWikiRepository = connection.getRepository(FishWiki);

    fishWikiRepository.find = jest.fn().mockResolvedValueOnce([wikiMock]);
    const res = await wikiController.getAllFish(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get filtered mobile fish with 1 parameter and a status code 200', async () => {
    const mockRequest = {} as RequestWithUserRole;
    mockRequest.query = {
      largeGroup: 'couro',
      mobile: 'true',
    };

    mockRequest.user = {
      id: '32423423565',
      admin: true,
      superAdmin: true,
    };

    const response = mockResponse();
    const fishWikiRepository = connection.getRepository(FishWiki);

    fishWikiRepository.find = jest.fn().mockResolvedValueOnce([wikiMock]);
    const res = await wikiController.getAllFish(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get filtered fish with multiple parameters and a status code 200', async () => {
    const mockRequest = {} as RequestWithUserRole;
    mockRequest.query = {
      largeGroup: 'couro',
      group: 'famosos',
    };
    const response = mockResponse();
    mockRequest.user = {
      id: '32423423565',
      admin: true,
      superAdmin: true,
    };
    const fishWikiRepository = connection.getRepository(FishWiki);

    fishWikiRepository.find = jest.fn().mockResolvedValueOnce([wikiMock]);
    const res = await wikiController.getAllFish(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a status code 500 request failed', async () => {
    const response = mockResponse();
    const fishWikiRepository = connection.getRepository(FishWiki);

    fishWikiRepository.find = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(Error('Request Failure')));
    const res = await wikiController.getAllFish(mockRequestDefault, response);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Test Get One Wiki function', () => {
  it('Should get a status code 200', async () => {
    const response = mockResponse();
    const fishWikiRepository = connection.getRepository(FishWiki);
    mockReq.user = {
      id: '32423423565',
      admin: true,
      superAdmin: true,
    };

    fishWikiRepository.findOne = jest.fn().mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce([wikiMock]),
    }));
    const res = await wikiController.getOneFishWiki(mockReq, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('Should get a status code 200', async () => {
    const response = mockResponse();
    const fishWikiRepository = connection.getRepository(FishWiki);

    mockReq.query = {
      mobile: 'true',
    };

    mockReq.user = {
      id: '32423423565',
      admin: true,
      superAdmin: true,
    };

    fishWikiRepository.findOne = jest.fn().mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce([wikiMock]),
    }));
    const res = await wikiController.getOneFishWiki(mockReq, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 404 if fishlog not found', async () => {
    const mockRequest = {} as RequestWithUserRole;
    const fishWikiRepository = connection.getRepository(FishWiki);

    mockRequest.params = {
      id: '3472417428',
    };

    mockRequest.user = {
      id: '32423423565',
      admin: true,
      superAdmin: true,
    };

    const response = mockResponse();
    fishWikiRepository.findOne = jest.fn().mockResolvedValueOnce(undefined);
    const res = await wikiController.getOneFishWiki(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('should get a status code 500 request failed', async () => {
    const response = mockResponse();
    const fishWikiRepository = connection.getRepository(FishWiki);

    mockRequestDefault.user = {
      id: '32423423565',
      admin: true,
      superAdmin: true,
    };

    fishWikiRepository.find = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(Error('Request Failure')));
    const res = await wikiController.getOneFishWiki(
      mockRequestDefault,
      response
    );
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Test Delete Fish', () => {
  it('should delete an exist fish', async () => {
    const response = mockResponse();
    const fishWikiRepository = connection.getRepository(FishWiki);

    fishWikiRepository.findOne = jest.fn().mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce([wikiMock]),
    }));

    mockReq.user = {
      id: '32423423565',
      admin: true,
      superAdmin: true,
    };

    const createQueryBuilder: any = {
      delete: () => createQueryBuilder,
      where: () => createQueryBuilder,
      execute: () => [wikiMock],
    };

    jest
      .spyOn(connection.getRepository(FishWiki), 'createQueryBuilder')
      .mockImplementation(() => createQueryBuilder);

    const res = await wikiController.deleteFish(mockReq, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return 401', async () => {
    const response = mockResponse();
    const fishWikiRepository = connection.getRepository(FishWiki);

    fishWikiRepository.findOne = jest.fn().mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce([wikiMock]),
    }));

    mockReq.user = {
      id: '32423423565',
      admin: false,
      superAdmin: false,
    };

    const createQueryBuilder: any = {
      delete: () => createQueryBuilder,
      where: () => createQueryBuilder,
      execute: () => [wikiMock],
    };

    jest
      .spyOn(connection.getRepository(FishWiki), 'createQueryBuilder')
      .mockImplementation(() => createQueryBuilder);

    const res = await wikiController.deleteFish(mockReq, response);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('should return 404 when try to delete an unexist fish', async () => {
    const response = mockResponse();
    const fishWikiRepository = connection.getRepository(FishWiki);

    fishWikiRepository.findOne = jest.fn().mockImplementationOnce(() => false);

    mockReq.user = {
      id: '32423423565',
      admin: true,
      superAdmin: true,
    };

    const res = await wikiController.deleteFish(mockReq, response);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('should return 500', async () => {
    const response = mockResponse();
    const fishWikiRepository = connection.getRepository(FishWiki);

    fishWikiRepository.findOne = jest.fn().mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce([wikiMock]),
    }));

    const createQueryBuilder: any = {
      delete: () => createQueryBuilder,
      where: () => createQueryBuilder,
      execute: () => {
        throw new Error();
      },
    };

    jest
      .spyOn(connection.getRepository(FishWiki), 'createQueryBuilder')
      .mockImplementation(() => createQueryBuilder);

    const res = await wikiController.deleteFish(mockReq, response);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Test Update Fish', () => {
  it('should update an exist fish', async () => {
    const response = mockResponse();
    const fishWikiRepository = connection.getRepository(FishWiki);

    fishWikiRepository.findOne = jest.fn().mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce([wikiMock]),
    }));

    const createQueryBuilder: any = {
      update: () => createQueryBuilder,
      set: () => createQueryBuilder,
      where: () => createQueryBuilder,
      execute: () => [wikiMock],
    };

    jest
      .spyOn(connection.getRepository(FishWiki), 'createQueryBuilder')
      .mockImplementation(() => createQueryBuilder);

    mockReq.body = {
      food: 'new food',
    };

    const res = await wikiController.updateFish(mockReq, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get 401', async () => {
    const response = mockResponse();
    const fishWikiRepository = connection.getRepository(FishWiki);

    fishWikiRepository.findOne = jest.fn().mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce([wikiMock]),
    }));

    const createQueryBuilder: any = {
      update: () => createQueryBuilder,
      set: () => createQueryBuilder,
      where: () => createQueryBuilder,
      execute: () => [wikiMock],
    };

    jest
      .spyOn(connection.getRepository(FishWiki), 'createQueryBuilder')
      .mockImplementation(() => createQueryBuilder);

    mockReq.body = {
      food: 'new food',
    };

    mockReq.user = {
      id: '32423423565',
      admin: false,
      superAdmin: false,
    };

    const res = await wikiController.updateFish(mockReq, response);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('should return 404 when try to update an unexist fish', async () => {
    const response = mockResponse();
    const fishWikiRepository = connection.getRepository(FishWiki);

    fishWikiRepository.findOne = jest.fn().mockImplementationOnce(() => false);
    mockReq.user = {
      id: '32423423565',
      admin: true,
      superAdmin: true,
    };

    const res = await wikiController.updateFish(mockReq, response);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('should return 500', async () => {
    const response = mockResponse();
    const fishWikiRepository = connection.getRepository(FishWiki);

    fishWikiRepository.findOne = jest.fn().mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce([wikiMock]),
    }));

    const createQueryBuilder: any = {
      update: () => createQueryBuilder,
      set: () => createQueryBuilder,
      where: () => createQueryBuilder,
      execute: () => {
        throw new Error();
      },
    };

    jest
      .spyOn(connection.getRepository(FishWiki), 'createQueryBuilder')
      .mockImplementation(() => createQueryBuilder);

    const res = await wikiController.updateFish(mockReq, response);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
