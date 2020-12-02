import { Component, OnInit, Inject } from '@angular/core';
import { SubscriptionService } from '../subscription.service';
import { Subscription, Interval } from '../subscription';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

    mode: string;

    title: string;
    started: string;
    ended: string;
    interval: Interval;
    last: string;

    intervalMode: string[][] = [
        ['years', 'Années'],
        ['months', 'Mois'],
        ['days', 'Jours']
    ];

    intervalNumber: string;
    choosedIntervalMode: string[];


    constructor(
        private subService: SubscriptionService,
        private router: Router,
        public dialog: MatDialog) { }

    ngOnInit(): void {
    }

    onChange(): void {
        if (this.intervalNumber && this.choosedIntervalMode) {
            this.interval = {
                value: +this.intervalNumber,
                unit: this.choosedIntervalMode[0] as moment.unitOfTime.DurationConstructor
            }
        } else {
            this.interval = undefined;
        }
    }

    submit(): void {
        if (this.isComplete()) {
            let sub: Subscription = undefined;
            if (this.mode === "unique") {
                const d: number = moment(this.ended).diff(moment.now(), 'days');
                const expired: boolean = (d < 0);
                sub = {
                    title: this.title,
                    started: moment(this.started),
                    ended: moment(this.ended),
                    autorenew: false,
                    expired
                }
            } else {
                sub = {
                    title: this.title,
                    started: moment(this.started),
                    interval: this.interval,
                    autorenew: true,
                    expired: false
                }
            }
            this.subService.push(sub);
            this.router.navigate(['/dashboard']);
        } else {
            this.dialog.open(ErrorDialog, {
                width: '250px',
                data: {}
            });
        }
    }

    private isComplete(): boolean {
        if (!this.title) {
            return false;
        }
        if (!this.started) {
            return false;
        }
        if (this.mode === "unique") {
            if (!this.ended) {
                return false;
            }
        } else if (this.mode === "subscription") {
            if (!this.interval) {
                return false;
            }
        } else {
            return false;
        }
        return true;
    }

}

@Component({
    selector: 'error-dialog',
    templateUrl: 'error.dialog.html',
})
export class ErrorDialog {

    constructor(
        public dialogRef: MatDialogRef<ErrorDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Object) { }

}