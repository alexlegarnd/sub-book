import { Component, OnInit } from '@angular/core';
import { Subscription } from '../subscription';
import { SubscriptionService } from '../subscription.service';
import * as moment from 'moment';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    arr: Subscription[] = [];

    constructor(subService: SubscriptionService) {
        subService.get().then((res) => {
            for (const itm of res) {
                this.arr.push(itm);
            }
        });
    }

    daysLeft(s: Subscription): number {
        return moment(s.ended).diff(moment.now(), 'days');
    }

    nextPayment(s: Subscription): number {
        if (s.last) {
            const r = moment(s.last).add(s.interval.value, s.interval.unit);
            return r.diff(moment.now(), 'days');
        }
        return 0;
    }

    ngOnInit(): void {
    }

}
