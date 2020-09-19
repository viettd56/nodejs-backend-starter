import { ICradle } from 'src/container';

export const JobProcess = ({ jobQueue, noteUseCase }: Pick<ICradle, 'jobQueue' | 'noteUseCase'>) => {
    const process = async () => {
        const { queueAddNote } = jobQueue;

        queueAddNote.process(5, async (job) => {
            const { note } = job.data;

            return await noteUseCase.create({ note });
        });

        console.log('🚀 Job process ready');
    };

    return {
        process,
    };
};
