import { Component } from '@angular/core';
// import {TestBoundariesService} from "shell/src/app/test-boundaries.service"; // uncomment for tags demo

@Component({
  selector: 'ft1-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ft1-app';
  // constructor(private tb: TestBoundariesService) {
  //   this.tb.notAllowed();
  // }
}
