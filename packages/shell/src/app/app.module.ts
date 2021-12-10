import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule } from "@angular/router";
import {WrapperComponent} from "./wrapper/wrapper.component";
import {startsWith} from "./wrapper/utils";

@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
        [
          {
            path: 'mixed',
            loadChildren: () =>
                import('./mixed-frameworks-page/mixed-frameworks-page.module').then((m) => m.MixedFrameworksPageModule),
          },
            {
            path: 'ft1_app',
            loadChildren: () =>
                import('ft1_app/Module').then((m) => m.RemoteEntryModule),
          },
          { matcher: startsWith('react_app'), component: WrapperComponent, data: { importName: 'react_app', elementName: 'react-app' }},
        ],
        // { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
