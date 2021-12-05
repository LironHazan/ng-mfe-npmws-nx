import {Component, OnInit} from '@angular/core';
import {SharedDataAccess} from "../../../shared/data-access/src";
// import {SharedDataAccess} from "@my-workspaces-playground-project/shared/data-access";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  counter = 0;
  constructor(private messenger: SharedDataAccess<{}>) {
  }

  ngOnInit(): void {
    this.messenger.register().subscribe((message) => {
      if (Object.keys(message.data).length > 0) {
        this.counter++
      }
      console.log(message);
    })

  }


}
