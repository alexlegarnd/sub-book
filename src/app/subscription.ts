import * as moment from 'moment';


export class Subscription {
    id?: number;
    title: string;
    started: moment.Moment;
    ended?: moment.Moment;
    interval?: Interval;
    last?: moment.Moment;
    autorenew: boolean;
    expired: boolean;
}

export class Interval {
    value: number;
    unit: moment.unitOfTime.DurationConstructor;
}
