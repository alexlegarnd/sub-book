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

    public findById(id: number): Subscription | null {
        const res = this.isIdExist(id);
        return (res) ? res as Subscription : null;
    }

    private updateDate(current: Subscription[]): Subscription[] {
        const n: Subscription[] = [];
        current.forEach((c) => {
            if (c.autorenew) {
                if (!c.last) {
                    c.last = c.started;
                }
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
        if (sub.id) {
            const rrr = this.isIdExist(sub.id);
            if (rrr) {
                const i: number = this.context.indexOf(rrr as Subscription);
                this.context[i] = sub;
            }
        } else {
            let inc = 0;
            do {
                sub.id = this.context.length + inc;
                inc++;
            } while (this.isIdExist(sub.id));
            this.context.push(sub);
        }
        return this.context;
    }

    public delete(id: number): void {
        const rrr = this.isIdExist(id);
        if (rrr) {
            const i: number = this.context.indexOf(rrr as Subscription);
            this.context.splice(id, 1);
            this.context.forEach((val, i) => {
                val.id = i;
            });
        }
    }

    private isIdExist(id: number): Subscription | boolean {
        const res: Subscription[] = this.context.filter((c) => id === c.id);
        if (res.length === 1) {
            return res[0];
        }
        return false;
    }

    private save(): void {
        localStorage.setItem('data', JSON.stringify(this.context));
    }

}
