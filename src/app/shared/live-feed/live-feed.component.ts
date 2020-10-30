import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  ITableColumn,
  SortDirection,
} from 'src/../projects/codesnooker/eztable/src/public-api';
import { USER_DATA } from '../fixtures';
import { IPlainUser, LivefeedService } from './livefeed.service';

@Component({
  selector: 'app-live-feed',
  templateUrl: './live-feed.component.html',
  styleUrls: ['./live-feed.component.scss'],
})
export class LiveFeedComponent implements OnInit, OnDestroy {
  private userDataCopy = [...USER_DATA];
  private subscription: Subscription;
  private timerSource = timer(1000, 5000);
  userData = [];

  headers: ITableColumn<string>[];

  isPlaying: boolean;
  users: IPlainUser[];
  constructor(private readonly service: LivefeedService) {}

  ngOnInit(): void {
    // this.subscribeToFeed();
    this.requestData();
  }

  ngOnDestroy(): void {
    this.unsubscribeToFeed();
  }

  private requestData() {
    this.service
      .getUserList()
      .pipe(
        tap((d) => {
          this.users = d;
          console.log(this.users);
          this.userData = this.users;
          if (!this.headers) {
            this.headers = Object.keys(this.userData[0]).map((x, i) => {
              return {
                key: x,
                value: i === 2 || i === 1 ? undefined : x,
                noSmartCase: true,
                sortDirection:
                  i === 2 ? SortDirection.ASCENDING : SortDirection.NONE,
              };
            });
          }
        })
      )
      .subscribe();
  }

  private shuffle(array = []) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  shuffleData() {
    // console.log('Shuffle Data => ', new Date().toLocaleTimeString());
    // this.userData = this.shuffle([...this.userDataCopy]);
    this.requestData();
  }

  subscribeToFeed() {
    this.isPlaying = true;
    this.subscription = this.timerSource.subscribe((val) => {
      this.shuffleData();
      return;
    });
  }

  unsubscribeToFeed() {
    this.isPlaying = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}
