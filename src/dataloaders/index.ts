import { ICradle } from 'src/container';

export const Dataloaders = ({ noteUseCase }: ICradle) => {
    const create = () => {
        const findUserByIdLoader = noteUseCase.findByIdLoader();
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
