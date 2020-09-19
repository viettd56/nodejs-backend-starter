import mongoose, { Types } from 'mongoose';

type NOTE_STATUS = 'DONE' | 'DOING';

export interface NoteDataInterface {
    _id: Types.ObjectId;
    note: string;
    status: NOTE_STATUS;
}

export interface NoteModelInterface extends mongoose.Document, NoteDataInterface {
    _id: Types.ObjectId;
    id: string;
    created_at: Date;
    updated_at: Date;
}

export interface NoteStaticInterface extends mongoose.Model<NoteModelInterface> {}

export const NOTE_COLLECTION_NAME = 'note';

const statics = {};

const schema = new mongoose.Schema(
    {
        note: String,
        status: {
            type: String,
            enum: ['DONE', 'DOING'],
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    },
);

schema.virtual('id').get(function (this: { _id: mongoose.Types.ObjectId }) {
    return this._id.toHexString();
});

schema.statics = statics;

schema.pre('save', async function (this: NoteModelInterface, next) {
    if (false) {
        return next(new Error('Invalid data'));
    }

    next();
});

export const NoteModel = () => {
    return mongoose.model<NoteModelInterface, NoteStaticInterface>(NOTE_COLLECTION_NAME, schema, NOTE_COLLECTION_NAME);
};
