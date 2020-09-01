import { Injectable } from '@angular/core';
import { Subscription } from './subscription';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  test: Subscription[] = [
    {
      title: 'PS Now',
      started: moment('2019-04-12T00:00:00'),
      ended: moment('2019-12-03T00:00:00'),
      autorenew: false,
      expired: true
    },
    {
      title: 'Youtube Premium',
      started: moment('2020-04-22T00:00:00'),
      interval: {
        value: 1,
        unit: 'M'
      },
      last: moment('2020-08-22T00:00:00'),
      autorenew: true,
      expired: false
    },
    {
      title: 'Netflix',
      started: moment('2018-04-12T00:00:00'),
      interval: {
        value: 1,
        unit: 'M'
      },
      last: moment('2020-08-12T00:00:00'),
      autorenew: true,
      expired: false
    }
  ];

  constructor() {
    this.save();
    this.test = JSON.parse(localStorage.getItem('data')) as Subscription[];
  }

  public async get(): Promise<Subscription[]> {
    return new Promise((resolve, reject) => {
      resolve(this.test);
    });
  }

  private save(): void {
    localStorage.setItem('data', JSON.stringify(this.test));
  }

}
