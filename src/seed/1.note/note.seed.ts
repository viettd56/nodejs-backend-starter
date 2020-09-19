import { getObjectId } from 'mongo-seeding';
import { NoteDataInterface } from 'src/domains/notes/Note.model';

const notes: NoteDataInterface[] = [
    {
        _id: getObjectId('note_1'),
        note: 'note 1',
        status: 'DOING',
    },
    {
        _id: getObjectId('note_2'),
        note: 'note 2',
        status: 'DONE',
    },
];

export = notes;
