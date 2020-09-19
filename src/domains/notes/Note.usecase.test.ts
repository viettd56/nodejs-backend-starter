import faker from 'faker';
import { getObjectId } from 'mongo-seeding';
import { JestHelper } from 'src/jest.helper';
import { NoteUseCase } from './Note.usecase';
import { NoteModel } from './Note.model';
import { NoteRepository } from './Note.repository';

describe('Test NoteUseCase', () => {
    let noteUseCase: ReturnType<typeof NoteUseCase>;
    beforeEach(async () => {
        await JestHelper().initDatabase();
        const noteModel = NoteModel();
        const noteRepository = NoteRepository({ NoteModel: noteModel });
        noteUseCase = NoteUseCase({
            noteRepository,
        });
    });
    afterEach(async () => {});
    describe('Test create', () => {
        it('Should error when note empty', async () => {
            try {
                await noteUseCase.create({
                    note: '',
                });
            } catch (error) {
                expect(error).toBeTruthy();
            }
        });

        it('Should error when note too long', async () => {
            try {
                await noteUseCase.create({
                    note: faker.lorem.sentence(100),
                });
            } catch (error) {
                expect(error).toBeTruthy();
            }
        });

        it('Should create note success', async () => {
            const note = faker.lorem.sentence(10);
            const data = await noteUseCase.create({
                note,
            });

            expect(data).toMatchObject({
                note,
                status: 'DOING',
            });
        });
    });

    describe('Test update', () => {
        it('Should error when note_id is empty', async () => {
            try {
                await noteUseCase.update({
                    note_id: '',
                    note: undefined,
                    status: undefined,
                });
            } catch (error) {
                expect(error).toBeTruthy();
            }
        });

        it('Should error when note not found', async () => {
            try {
                await noteUseCase.update({
                    note_id: getObjectId('note_not_found').toHexString(),
                    note: undefined,
                    status: undefined,
                });
            } catch (error) {
                expect(error).toBeTruthy();
            }
        });

        it('Should update note success', async () => {
            const data = await noteUseCase.update({
                note_id: getObjectId('note_1').toHexString(),
                note: 'new note',
                status: 'DONE',
            });

            expect(data).toMatchObject({
                _id: getObjectId('note_1'),
                note: 'new note',
                status: 'DONE',
            });
        });
    });

    describe('Test list', () => {
        it('Should return list note', async () => {
            const data = await noteUseCase.list();
            expect(data.length).toEqual(2);
        });
    });

    describe('Test count', () => {
        it('Should return list note count', async () => {
            const data = await noteUseCase.count();
            expect(data).toEqual(2);
        });
    });
});
