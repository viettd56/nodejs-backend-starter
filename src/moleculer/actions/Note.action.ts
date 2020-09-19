import { ServiceActions } from 'moleculer';
import { CreateNoteParams, CreateNoteResponse } from '../TemplateServices';
import { ICradle } from 'src/container';

export const NoteAction = ({ noteUseCase }: Pick<ICradle, 'noteUseCase'>) => {
    const createServiceAction = (): ServiceActions => {
        return {
            'create-note': {
                metrics: {
                    params: true,
                },
                handler: async (ctx): Promise<CreateNoteResponse> => {
                    const { note } = ctx.params as CreateNoteParams;
                    const data = await noteUseCase.create({ note });
                    return {
                        data: {
                            id: data.id,
                            note: data.note,
                            status: data.status,
                        },
                        error_code: 0,
                        message: 'Create note success',
                    };
                },
            },
        };
    };

    return {
        createServiceAction,
    };
};
