import { ICradle } from 'src/container';
import _ from 'lodash';
import { Validation, Joi, isMongoId } from 'src/helpers/Validation.helper';
import { NoteModelInterface } from './Note.model';
import DataLoader from 'dataloader';

export const NoteUseCase = ({ noteRepository }: ICradle) => {
    const findByIdLoader = () => {
        return new DataLoader<string, NoteModelInterface>(async (ids) => {
            const datas = await findByManyId({ ids: [...ids] });
            return ids.map((id) => {
                return (
                    _.find(datas, function (data) {
                        return data.id === id;
                    }) || new Error(`No value for ${id}`)
                );
            });
        });
    };

    const create = async ({ note }: { note: NoteModelInterface['note'] }) => {
        return await noteRepository.create({ note });
    };

    const update = async ({
        note,
        note_id,
        status,
    }: {
        note_id: NoteModelInterface['id'];
        note: NoteModelInterface['note'] | undefined;
        status?: NoteModelInterface['status'] | undefined;
    }) => {
        return await noteRepository.update({ note, note_id, status });
    };

    const list = async () => {
        return await noteRepository.list();
    };

    const count = async () => {
        return await noteRepository.count();
    };

    const findByManyId = async (input: { ids: string[] }) => {
        const { ids } = Validation(input).validate({
            ids: Joi.array().items(Joi.string()).min(1),
        });
        return await noteRepository.findByManyId(ids);
    };

    return {
        create,
        update,
        list,
        count,
        findByManyId,
        findByIdLoader,
    };
};
