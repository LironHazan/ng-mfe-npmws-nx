import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule, UrlMatcher, UrlSegment} from "@angular/router";
import {SecondaryModule} from "./secondary/secondary.module";
import {WrapperComponent} from "./wrapper/wrapper.component";

function startsWith(prefix: string): UrlMatcher {
    return (url: UrlSegment[]) => {
        const fullUrl = url.map(u => u.path).join('/');
        if (fullUrl.startsWith(prefix)) {
            return ({ consumed: url});
        }
        return null;
    };
}

@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent
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
          { matcher: startsWith('react_app'), component: WrapperComponent, data: { importName: 'react_app', elementName: 'react-app' }},
        ],
        { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
