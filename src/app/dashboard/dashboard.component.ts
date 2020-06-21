import { Component, OnInit } from '@angular/core';
import { Subscription } from '../subscription';
import { SubscriptionService } from '../subscription.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  arr: Subscription[] = [];

  constructor(private subService: SubscriptionService) {
      subService.get().then((res) => {
          for (const itm of res) {
              this.arr.push(itm);
          }
      });
  }

  private daysBetween(d: Date): number {
      const now = new Date();
      return Math.round((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  }

  expiredIn(d: Date): string {
      const days = this.daysBetween(d);
      if (days > 1) {
          return `${days} days left`;
      } else if (days === 1) {
          return `1 day left`;
      }
      return 'Expired';
  }

  isExpired(d: Date): boolean {
      const days = this.daysBetween(d);
      return (days <= 0);
  }

  ngOnInit(): void {
  }

}
