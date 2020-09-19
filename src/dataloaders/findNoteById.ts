import DataLoader from 'dataloader';
import _ from 'lodash';
import { ICradle } from 'src/container';
import { NoteModelInterface } from 'src/domains/notes/Note.model';

export const FindNoteByIdLoader = ({ noteUseCase }: Pick<ICradle, 'noteUseCase'>) => {
    const findNoteByIdLoader = new DataLoader<string, NoteModelInterface>(async (ids) => {
        findNoteByIdLoader.clearAll();
        const datas = await noteUseCase.findByManyId({ ids: [...ids] });
        return ids.map((id) => {
            return (
                _.find(datas, function (data) {
                    return data.id === id;
                }) || new Error(`No value for ${id}`)
            );
        });
    });
    return findNoteByIdLoader;
};
