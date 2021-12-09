import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {SharedDataAccess} from "../../../shared/data-access/src";
import {Subscription} from "rxjs";
import {Channel, SimpleEventEmitter} from "../../../shared/simple-event-emitter/src";

@Component({
  selector: 'shell-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  counter = 0;
  messageFromReactApp = '';
  subscription: Subscription | undefined;
  constructor(private messenger: SharedDataAccess<{}>, private cdr: ChangeDetectorRef) {
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
    const channel =  SimpleEventEmitter.init(Channel.TestChannel);
    channel.subscribe((data: unknown) => {
      this.messageFromReactApp = data + '_' + Math.random();
      this.cdr.detectChanges();
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
