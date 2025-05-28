import { sampleRepository } from './sample.repository';
import { sampleService } from './sample.service';
import { SampleEntity } from './sample.entity';
import { sequelize } from 'src/models/sequelize';
import { Exception } from 'src/helpers/Exception.helper';

// Mock the sampleRepository
jest.mock('./sample.repository', () => ({
  sampleRepository: {
    logic: jest.fn(),
    findByIdWithLock: jest.fn(),
    update: jest.fn(),
    getTransaction: jest.fn(),
  },
}));

describe('SampleService', () => {
  let mockRepositoryLogic: jest.SpyInstance;
  let mockFindByIdWithLock: jest.SpyInstance;
  let mockUpdate: jest.SpyInstance;
  let mockGetTransaction: jest.SpyInstance;
  let mockTransaction: any;

  beforeEach(() => {
    // Create fresh spies before each test
    mockRepositoryLogic = jest.spyOn(sampleRepository, 'logic');
    mockFindByIdWithLock = jest.spyOn(sampleRepository, 'findByIdWithLock');
    mockUpdate = jest.spyOn(sampleRepository, 'update');
    
    // Setup transaction mock
    mockTransaction = {
      LOCK: {
        UPDATE: 'UPDATE',
      },
      commit: jest.fn().mockResolvedValue(undefined),
      rollback: jest.fn().mockResolvedValue(undefined),
    };
    
    mockGetTransaction = jest.spyOn(sampleRepository, 'getTransaction')
      .mockResolvedValue(mockTransaction);
  });

  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  describe('logic', () => {
    it('should return true when repository returns a positive number', async () => {
      // Arrange
      mockRepositoryLogic.mockReturnValue(1);

      // Act
      const result = await sampleService.logic();

      // Assert
      expect(mockRepositoryLogic).toHaveBeenCalledTimes(1);
      expect(result).toBe(true);
    });

    it('should return false when repository returns a negative number', async () => {
      // Arrange
      mockRepositoryLogic.mockReturnValue(-1);

      // Act
      const result = await sampleService.logic();

      // Assert
      expect(mockRepositoryLogic).toHaveBeenCalledTimes(1);
      expect(result).toBe(false);
    });

    it('should return "SampleService" when repository returns 0', async () => {
      // Arrange
      mockRepositoryLogic.mockReturnValue(0);

      // Act
      const result = await sampleService.logic();

      // Assert
      expect(mockRepositoryLogic).toHaveBeenCalledTimes(1);
      expect(result).toBe('SampleService');
    });
  });

  describe('clearName', () => {
    const sampleId = 'test-id';
    const mockSample = {
      id: sampleId,
      name: 'Test Name',
      save: jest.fn(),
    };

    it('should clear the name successfully', async () => {
      // Arrange
      mockFindByIdWithLock.mockResolvedValue(mockSample);
      mockUpdate.mockImplementation(async (entity, model, t) => {
        model.name = entity.toObject().name;
        return model;
      });

      // Act
      const result = await sampleService.clearName(sampleId);

      // Assert
      expect(mockGetTransaction).toHaveBeenCalled();
      expect(mockFindByIdWithLock).toHaveBeenCalledWith(sampleId, mockTransaction);
      expect(mockUpdate).toHaveBeenCalledWith(
        expect.any(SampleEntity),
        mockSample,
        mockTransaction
      );
      expect(mockTransaction.commit).toHaveBeenCalled();
      expect(mockTransaction.rollback).not.toHaveBeenCalled();
      expect(result).toBe(true);
      expect(mockSample.name).toBe('');
    });

    it('should throw an exception when sample not found', async () => {
      // Arrange
      mockFindByIdWithLock.mockResolvedValue(null);

      // Act & Assert
      await expect(sampleService.clearName(sampleId)).rejects.toThrow('Sample not found');
      expect(mockTransaction.rollback).toHaveBeenCalled();
      expect(mockTransaction.commit).not.toHaveBeenCalled();
    });

    it('should handle transaction errors', async () => {
      // Arrange
      const testError = new Error('Transaction failed');
      mockFindByIdWithLock.mockRejectedValue(testError);

      // Act & Assert
      await expect(sampleService.clearName(sampleId)).rejects.toThrow(testError);
      expect(mockTransaction.rollback).toHaveBeenCalled();
      expect(mockTransaction.commit).not.toHaveBeenCalled();
    });
  });
});
