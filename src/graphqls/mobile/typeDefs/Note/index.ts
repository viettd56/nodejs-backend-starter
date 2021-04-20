import { readFileSync } from 'fs';
import path from 'path';
import { MobileMutationResolvers, MobileQueryResolvers, MobileListNoteResolvers } from 'src/generated/graphqls/mobile';
import { ICradle } from 'src/container';
import { Validation, Joi, isMongoId } from 'src/helpers/Validation.helper';

const typeDef = readFileSync(path.join(__dirname, 'typeDef.graphql'), 'UTF-8');

export const MobileNoteSchema = ({ noteUseCase, jobQueue }: ICradle) => {
    const Mutation: MobileMutationResolvers = {
        addNote: async (_, { note }) => {
            Validation({ note }).validate({
                note: Joi.string().min(0).max(100).required(),
            });
            return await noteUseCase.create({
                note,
            });
        },
        updateNote: async (_, { note_id, note, status }) => {
            Validation({ note_id, note, status }).validate({
                note_id: isMongoId().required(),
                note: Joi.string().min(0).max(100),
                status: Joi.string(),
            });
            return await noteUseCase.update({
                note,
                note_id,
                status,
            });
        },
        addNoteAsync: async (_, { note }) => {
            Validation({ note }).validate({
                note: Joi.string().min(0).max(100).required(),
            });
            const { queueAddNote } = jobQueue;
            await queueAddNote.add({
                note,
            });
            return true;
        },
    };

    const Query: MobileQueryResolvers = {
        allNote: () => {
            return {};
        },
    };

    const ListNote: MobileListNoteResolvers = {
        total: async () => {
            return noteUseCase.count();
        },

        data: () => {
            return noteUseCase.list();
        },
    };

    return {
        resolvers: {
            Mutation,
            Query,
            ListNote,
        },
        typeDef,
    };
};
