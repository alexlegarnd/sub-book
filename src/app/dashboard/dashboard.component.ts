import { Component, OnInit } from '@angular/core';
import { Subscription } from '../subscription';
import { SubscriptionService } from '../subscription.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    arr: Subscription[] = [];

    constructor(subService: SubscriptionService, private router: Router) {
        subService.get().then((res) => {
            for (const itm of res) {
                this.arr.push(itm);
            }
        });
    }

    daysLeft(s: Subscription): number {
        return moment(s.ended).diff(moment.now(), 'days');
    }

    nextPayment(s: Subscription): string {
        if (s.last) {
            const r = moment(s.last).add(s.interval.value, s.interval.unit);
            let d = r.diff(moment.now(), 'days');
            if (d === 0) {
                d = r.diff(moment.now(), 'hours');
                return (d <= 1) ? `${d} heure` : `${d} heures`;
            }
            return (d <= 1) ? `${d} jour` : `${d} jours`;
        }
        return "Pas de prochain paiement";
    }

    showDetail(id: number): void {
        this.router.navigate(['/detail', id]);
    }

    ngOnInit(): void {
    }

}
