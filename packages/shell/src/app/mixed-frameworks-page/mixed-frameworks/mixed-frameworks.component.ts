import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Channel, SimpleEventEmitter} from "../../../../../shared/simple-event-emitter/src";

@Component({
  selector: 'shell-mixed-frameworks',
  templateUrl: './mixed-frameworks.component.html',
  styleUrls: ['./mixed-frameworks.component.scss']
})
export class MixedFrameworksComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef) {}

  messageFromReactApp = '';
  ngOnInit(): void {
    const channel =  SimpleEventEmitter.init(Channel.TestChannel);
    channel.register((data: unknown) => {
      this.messageFromReactApp = data + '_' + Math.random();
      this.cdr.detectChanges();
    })
  }
}
