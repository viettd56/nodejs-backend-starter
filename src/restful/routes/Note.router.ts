import express from 'express';
import { ICradle } from 'src/container';
import { Validation, Joi, isMongoId } from 'src/helpers/Validation.helper';

export const NoteRouter = ({ noteUseCase }: ICradle) => {
    const router = express.Router();

    router.get('/', async (req, res, next) => {
        try {
            const allNote = await noteUseCase.list();
            const total = await noteUseCase.count();
            res.send({
                status: true,
                message: 'Get list note success',
                data: {
                    total,
                    data: allNote.map((noteData) => {
                        return {
                            id: noteData.id,
                            note: noteData.note,
                            status: noteData.status,
                        };
                    }),
                },
            });
        } catch (e) {
            res.status(500).send({
                status: false,
                message: e.message,
            });
        }
    });

    router.post('/', async (req, res, next) => {
        try {
            const {
                note,
            }: {
                note: string;
            } = req.body;
            Validation({ note }).validate({
                note: Joi.string().min(0).max(100).required(),
            });

            const noteData = await noteUseCase.create({
                note,
            });
            res.send({
                status: true,
                message: 'create note success',
                data: {
                    id: noteData.id,
                    note: noteData.note,
                    status: noteData.status,
                },
            });
        } catch (e) {
            res.status(500).send({
                status: false,
                message: e.message,
            });
        }
    });

    router.post('/:id', async (req, res, next) => {
        try {
            const {
                note,
                status,
            }: {
                note: string;
                status: 'DOING' | 'DONE';
            } = req.body;

            const { id } = req.params;

            Validation({ id, note, status }).validate({
                id: isMongoId().required(),
                note: Joi.string().min(0).max(100),
                status: Joi.string(),
            });

            const noteData = await noteUseCase.update({
                note_id: id,
                note,
                status,
            });
            res.send({
                status: true,
                message: 'update note success',
                data: {
                    id: noteData.id,
                    note: noteData.note,
                    status: noteData.status,
                },
            });
        } catch (e) {
            res.status(500).send({
                status: false,
                message: e.message,
            });
        }
    });

    return {
        router,
    };
};
