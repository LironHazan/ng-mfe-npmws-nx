import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {SecondaryModule} from "./secondary/secondary.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
      SecondaryModule,
    RouterModule.forRoot(
        [
          {
            path: 'ft1_app',
            loadChildren: () =>
                import('ft1_app/Module').then((m) => m.RemoteEntryModule),
          },
        ],
        { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
