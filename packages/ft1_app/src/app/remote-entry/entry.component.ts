import { Component } from '@angular/core';
import {SharedDataAccess} from "../../../../shared/data-access/src";
// import {SharedDataAccess} from "@nxe/shared/data-access";

@Component({
  selector: 'ft1-ft1-app-entry',
  template: `<div class="remote-entry">
    <h2>ft1-app's Remote Entry Component</h2>
    <button (click)="sendMessage()"> ping </button>
  </div>`,
  styles: [`
  .remote-entry {
    background-color: #143055;
    color: white;
    padding: 5px;
  }`]
})
export class RemoteEntryComponent {
  constructor(private messenger: SharedDataAccess<{}>) {
  }
  sendMessage() {
    this.messenger.update({event: 'hello', data: {name: 'liron'}});
  }
}
