import { Dispatcher } from './Dispatcher';
import { Youtuber } from '../types/youtubers.types';

export class YoutuberActions {
    private static dispatcher = Dispatcher.getInstance();

    public static vote(youtuberId: number): void {
        this.dispatcher.dispatch({
            type: 'VOTE',
            payload: { youtuberId }
        });
    }

    public static updateStatistics(youtubers: Youtuber[]): void {
        this.dispatcher.dispatch({
            type: 'UPDATE_STATISTICS',
            payload: { youtubers }
        });
    }

    public static updateYoutuber(youtuber: Youtuber): void {
        this.dispatcher.dispatch({
            type: 'UPDATE_STATISTICS',
            payload: { youtuber }
        });
    }
}