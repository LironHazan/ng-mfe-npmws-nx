import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedDataAccess} from "../../../shared/data-access/src";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  counter = 0;
  subscription: Subscription | undefined;
  constructor(private messenger: SharedDataAccess<{}>) {
  }

  ngOnInit(): void {
    this.subscription
     = this.messenger.register().subscribe((message) => {
      if (Object.keys(message.data).length > 0) {
        this.counter++
      }
      console.log(message);
    })

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
