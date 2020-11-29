import { Injectable } from '@angular/core';
import { Subscription } from './subscription';
import * as moment from 'moment';


@Injectable({
    providedIn: 'root'
})
export class SubscriptionService {

    context: Subscription[] = [];

    constructor() {
        if (localStorage.getItem('data')) {
            this.context = JSON.parse(localStorage.getItem('data')) as Subscription[];
        }
    }

    public async get(): Promise<Subscription[]> {
        return new Promise((resolve, reject) => {
            this.context = this.updateDate(this.context);
            this.save();
            resolve(this.context);
        });
    }

    private updateDate(current: Subscription[]): Subscription[] {
        const n: Subscription[] = [];
        current.forEach((c) => {
            console.log(c.autorenew);
            if (c.autorenew) {
                let r = moment(c.last).add(c.interval.value, c.interval.unit);
                let diff: number = r.diff(moment.now(), 'days');
                while (diff < 0) {
                    c.last = moment(c.last).add(1, 'months');
                    r = moment(c.last).add(c.interval.value, c.interval.unit);
                    diff = r.diff(moment.now(), 'days');
                }
            } else if (c.ended) {
                const d: number = moment(c.ended).diff(moment.now(), 'days');
                const expired: boolean = (d < 0);
                c.expired = expired;
            }
            n.push(c);
        });
        return n;
    }

    public push(sub: Subscription): Subscription[] {
        this.context.push(sub);
        return this.context;
    }

    private save(): void {
        localStorage.setItem('data', JSON.stringify(this.context));
    }

}
