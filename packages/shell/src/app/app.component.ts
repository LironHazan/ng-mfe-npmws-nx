import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedDataAccess} from "../../../shared/data-access/src";
import {Subscription} from "rxjs";

@Component({
  selector: 'shell-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  counter = 0;
  messageFromReactApp = '';
  subscription: Subscription | undefined;
  constructor(private messenger: SharedDataAccess<{}>) {
  }

  ngOnInit(): void {
    // Using a shared service for angular ---> angular communication
    this.subscription
     = this.messenger.register().subscribe((message) => {
      if (Object.keys(message.data).length > 0) {
        this.counter++
      }
      console.log(message);
    })

    // Using message bus communication
    const bc = new BroadcastChannel('test_channel');
    bc.onmessage = (ev) => {
      this.messageFromReactApp = ev.data + '_' + Math.random();
    };
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
