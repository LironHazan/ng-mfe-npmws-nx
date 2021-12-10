import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MixedFrameworksComponent} from "./mixed-frameworks/mixed-frameworks.component";
import {RouterModule, Routes} from "@angular/router";
import {WrapperComponent} from "../wrapper/wrapper.component";
import {SecondaryModule} from "./secondary/secondary.module";
import { SecondaryComponent } from './secondary/secondary/secondary.component';

const routes: Routes = [
  {
    path: '',
    component: MixedFrameworksComponent,
    children: [
      {
        path: '',
        component: SecondaryComponent,
        outlet: 'angular'
      },
      {
        path: '',
        component: WrapperComponent,
        data: {
          importName: 'react_app',
          elementName: 'react-app',
        },
        outlet: 'react'
      },
    ]
  }
];

@NgModule({
  declarations: [
    MixedFrameworksComponent
  ],
  imports: [
    CommonModule,
    SecondaryModule,
    RouterModule.forChild(routes)
  ],
  exports: [MixedFrameworksComponent]
})
export class MixedFrameworksPageModule { }
