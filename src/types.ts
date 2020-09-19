import { Dataloaders } from './dataloaders';

export type Unpacked<T> = T extends Array<infer U>
    ? U
    : T extends (...args: any[]) => infer U
    ? U
    : T extends Promise<infer U>
    ? U
    : T;

export type UnpackedReturnType<T> = T extends (...args: any[]) => any ? Unpacked<ReturnType<T>> : T;

export interface ISortObject {
    [key: string]: 1 | -1;
}

export interface IMobileContext {
    dataloaders: ReturnType<typeof Dataloaders>;
    accessToken: string;
}
