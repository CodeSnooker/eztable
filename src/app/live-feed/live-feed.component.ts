import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { USER_DATA } from '../fixtures';

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
  isPlaying: boolean;

  constructor() {}

  ngOnInit(): void {
    this.subscribeToFeed();
  }

  ngOnDestroy(): void {
    this.unsubscribeToFeed();
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
    console.log('Shuffle Data => ', new Date().toLocaleTimeString());
    this.userData = this.shuffle([...this.userDataCopy]);
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
