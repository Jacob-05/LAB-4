import { Youtuber } from '../types/youtubers.types';

export class Dispatcher {
    private static instance: Dispatcher;
    private callbacks: ((action: any) => void)[] = [];

    private constructor() {}

    public static getInstance(): Dispatcher {
        if (!Dispatcher.instance) {
            Dispatcher.instance = new Dispatcher();
        }
        return Dispatcher.instance;
    }

    public register(callback: (action: any) => void): void {
        this.callbacks.push(callback);
    }

    public dispatch(action: {
        type: 'VOTE' | 'UPDATE_STATISTICS';
        payload: {
            youtuberId?: number;
            youtuber?: Youtuber;
            youtubers?: Youtuber[];
        };
    }): void {
        this.callbacks.forEach(callback => callback(action));
    }
}