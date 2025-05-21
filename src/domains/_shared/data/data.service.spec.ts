import { dataService } from './data.service';
import { sampleRepository } from 'src/domains/_shared/_sample/sample.repository';

// Mock the sampleRepository
jest.mock('src/domains/_shared/_sample/sample.repository', () => ({
    sampleRepository: {
        logic: jest.fn(),
    },
}));

describe('DataService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('logic', () => {
        it('should return true when sampleRepository.logic returns positive number', async () => {
            // Arrange
            (sampleRepository.logic as jest.Mock).mockReturnValue(1);

            // Act
            const result = await dataService.logic();

            // Assert
            expect(result).toBe(true);
            expect(sampleRepository.logic).toHaveBeenCalled();
        });

        it('should return false when sampleRepository.logic returns negative number', async () => {
            // Arrange
            (sampleRepository.logic as jest.Mock).mockReturnValue(-1);

            // Act
            const result = await dataService.logic();

            // Assert
            expect(result).toBe(false);
            expect(sampleRepository.logic).toHaveBeenCalled();
        });

        it('should return "SampleService" when sampleRepository.logic returns zero', async () => {
            // Arrange
            (sampleRepository.logic as jest.Mock).mockReturnValue(0);

            // Act
            const result = await dataService.logic();

            // Assert
            expect(result).toBe('SampleService');
            expect(sampleRepository.logic).toHaveBeenCalled();
        });
    });
});
