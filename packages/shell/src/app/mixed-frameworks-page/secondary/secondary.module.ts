import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondaryComponent } from './secondary/secondary.component';



@NgModule({
  declarations: [
    SecondaryComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [SecondaryComponent]
})
export class SecondaryModule { }
