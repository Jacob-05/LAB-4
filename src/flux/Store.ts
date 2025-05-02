import { Dispatcher } from './Dispatcher';
import { Youtuber } from '../types/youtubers.types';

export class YoutuberStore {
    private static instance: YoutuberStore;
    private youtubers: Youtuber[] = [];
    private listeners: (() => void)[] = [];

    private constructor() {
        const dispatcher = Dispatcher.getInstance();
        dispatcher.register(this.handleAction.bind(this));
    }

    public static getInstance(): YoutuberStore {
        if (!YoutuberStore.instance) {
            YoutuberStore.instance = new YoutuberStore();
        }
        return YoutuberStore.instance;
    }

    private handleAction(action: {
        type: 'VOTE' | 'UPDATE_STATISTICS';
        payload: {
            youtuberId?: number;
            youtuber?: Youtuber;
            youtubers?: Youtuber[];
        };
    }): void {
        switch (action.type) {
            case 'VOTE':
                if (action.payload.youtuberId) {
                    this.incrementVote(action.payload.youtuberId);
                }
                break;
            case 'UPDATE_STATISTICS':
                if (action.payload.youtubers) {
                    this.youtubers = action.payload.youtubers;
                } else if (action.payload.youtuber) {
                    this.updateYoutuber(action.payload.youtuber);
                }
                break;
        }
        this.emitChange();
    }

    private incrementVote(youtuberId: number): void {
        this.youtubers = this.youtubers.map(youtuber =>
            youtuber.id === youtuberId
                ? { ...youtuber, votes: youtuber.votes + 1 }
                : youtuber
        );
    }

    private updateYoutuber(updatedYoutuber: Youtuber): void {
        this.youtubers = this.youtubers.map(youtuber =>
            youtuber.id === updatedYoutuber.id ? updatedYoutuber : youtuber
        );
    }

    public getYoutubers(): Youtuber[] {
        return this.youtubers;
    }

    public setYoutubers(youtubers: Youtuber[]): void {
        this.youtubers = youtubers;
        this.emitChange();
    }

    public addChangeListener(listener: () => void): void {
        this.listeners.push(listener);
    }

    public removeChangeListener(listener: () => void): void {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    private emitChange(): void {
        this.listeners.forEach(listener => listener());
    }
}