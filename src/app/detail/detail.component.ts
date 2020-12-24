import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Interval } from '../subscription';
import { SubscriptionService } from '../subscription.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

    sub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private subService: SubscriptionService,
        public dialog: MatDialog,
        private router: Router) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.sub = this.subService.findById(+id);
        if (!this.sub) {
            this.router.navigate(['/dashboard']);
        }
        window.scroll(0,0);
    }

    getInterval(): string {
        if (this.sub && this.sub.interval) {
            let unit: string = '';
            const int: Interval = this.sub.interval;
            if (int.unit.startsWith('d')) {
                unit = (int.value === 1) ? 'jour' : 'jours'
            } else if (int.unit.startsWith('m')) {
                unit = 'mois';
            } else if (int.unit.startsWith('y')) {
                unit = (int.value === 1) ? 'année' : 'années';
            }
            return `${int.value} ${unit}`;
        }
        return '';
    }

    delete(): void {
        const dialogRef = this.dialog.open(DeleteEntryDialog, {
            width: '250px',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.subService.delete(this.sub.id);
                this.router.navigate(['/dashboard']);
            }
        });
    }

}

@Component({
    selector: 'delete-entry-dialog',
    templateUrl: 'delete-entry.dialog.html',
})
export class DeleteEntryDialog {

    constructor(
        public dialogRef: MatDialogRef<DeleteEntryDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Object) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}