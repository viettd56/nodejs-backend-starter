import { ICradle } from 'src/container';
import _ from 'lodash';
import { Validation, Joi, isMongoId } from 'src/helpers/Validation.helper';
import { NoteModelInterface } from './Note.model';

export const NoteRepository = ({ NoteModel }: Pick<ICradle, 'NoteModel'>) => {
    const create = async ({ note }: { note: NoteModelInterface['note'] }) => {
        const newNote = new NoteModel({
            note,
            status: 'DOING',
        });

        return await newNote.save();
    };

    const update = async ({
        note_id,
        note,
        status,
    }: {
        note_id: string;
        note?: string;
        status?: NoteModelInterface['status'];
    }) => {
        const noteData = await NoteModel.findById(note_id);
        if (!noteData) {
            throw new Error('Note not found');
        }
        if (_.isString(note)) {
            noteData.note = note;
        }
        if (_.isString(status)) {
            noteData.status = status;
        }

        return await noteData.save();
    };

    const list = async () => {
        return await NoteModel.find({});
    };

    const count = async () => {
        return await NoteModel.find({}).countDocuments();
    };

    const findByManyId = async (ids: string[]) => {
        return await NoteModel.find({
            _id: {
                $in: ids,
            },
        });
    };

    return {
        create,
        update,
        list,
        count,
        findByManyId,
    };
};
