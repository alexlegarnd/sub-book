import { Injectable } from '@angular/core';
import { Subscription } from './subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  test: Subscription[] = [
    {
      id: 1,
      title: 'PS Now',
      ended: new Date('2020-12-03T00:00:00'),
      autorenew: false
    },
    {
      id: 2,
      title: 'Youtube Premium',
      ended: new Date('2020-07-01T00:00:00'),
      autorenew: true
    },
    {
      id: 3,
      title: 'Netflix',
      ended: new Date('2018-12-03T00:00:00'),
      autorenew: true
    }
  ];

  constructor() { }

  public async get(): Promise<Subscription[]> {
    return new Promise((resolve, reject) => {
      resolve(this.test);
    });
  }
}
