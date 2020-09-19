import { ICradle } from 'src/container';
import { FindNoteByIdLoader } from './findNoteById';

export const Dataloaders = ({ noteUseCase }: Pick<ICradle, 'noteUseCase'>) => {
    const create = () => {
        const findUserByIdLoader = FindNoteByIdLoader({ noteUseCase });
        const findNoteById = (id: string) => {
            try {
                return findUserByIdLoader.load(id);
            } catch (error) {
                findUserByIdLoader.clear(id);
                throw error;
            }
        };
        return {
            findNoteById,
        };
    };

    return {
        create,
    };
};
