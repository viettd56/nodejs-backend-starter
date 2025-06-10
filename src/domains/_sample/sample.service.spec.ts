// src/domains/_sample/sample.service.spec.ts
const mockFindByIdWithLock = jest.fn();
const mockUpdate = jest.fn();
const mockTransaction = jest.fn();
const mockRandom = jest.fn();

jest.mock('./sample.repository', () => ({
    sampleRepository: {
        findByIdWithLock: mockFindByIdWithLock,
        update: mockUpdate,
    },
}));

jest.mock('src/models/sequelize', () => ({
    sequelize: {
        transaction: mockTransaction,
    },
}));

jest.mock('lodash', () => ({
    random: mockRandom,
}));

import { Exception } from 'src/helpers/Exception.helper';

describe('sampleService', () => {
    let sampleService: typeof import('./sample.service').sampleService;

    beforeAll(() => {
        sampleService = require('./sample.service').sampleService;
    });

    describe('logic', () => {
        it('should return true if num > 0', async () => {
            mockRandom.mockReturnValue(5);
            const result = await sampleService.logic();
            expect(result).toBe(true);
        });

        it('should return false if num < 0', async () => {
            mockRandom.mockReturnValue(-5);
            const result = await sampleService.logic();
            expect(result).toBe(false);
        });

        it('should return "SampleService" if num === 0', async () => {
            mockRandom.mockReturnValue(0);
            const result = await sampleService.logic();
            expect(result).toBe('SampleService');
        });
    });

    describe('clearName', () => {
        const transaction = {};
        beforeEach(() => {
            mockTransaction.mockImplementation(async (cb: any) => cb(transaction));
            mockFindByIdWithLock.mockReset();
            mockUpdate.mockReset();
        });

        it('should throw Exception if sampleEntity not found', async () => {
            mockFindByIdWithLock.mockResolvedValue(null);
            await expect(sampleService.clearName('id')).rejects.toThrow(Exception);
        });

        it('should call clearName and update if sampleEntity found', async () => {
            const sampleEntity = { clearName: jest.fn() };
            mockFindByIdWithLock.mockResolvedValue(sampleEntity);
            mockUpdate.mockResolvedValue(undefined);

            await sampleService.clearName('id');
            expect(sampleEntity.clearName).toHaveBeenCalled();
            expect(mockUpdate).toHaveBeenCalledWith(sampleEntity, transaction);
        });
    });
});
