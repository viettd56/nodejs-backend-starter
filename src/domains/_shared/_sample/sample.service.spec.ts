import { sampleRepository } from './sample.repository';
import { sampleService } from './sample.service';

// Mock the sampleRepository
jest.mock('./sample.repository', () => ({
  sampleRepository: {
    logic: jest.fn(),
  },
}));

describe('SampleService', () => {
  let mockRepositoryLogic: jest.SpyInstance;

  beforeEach(() => {
    // Create a fresh spy before each test
    mockRepositoryLogic = jest.spyOn(sampleRepository, 'logic');
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
});
