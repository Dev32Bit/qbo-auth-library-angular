import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QboAuthComponent } from './qbo-auth-lib.component';

@NgModule({
  declarations: [
    QboAuthComponent
  ],
  imports: [
    CommonModule  // ONLY modules here
  ],
  exports: [
    QboAuthComponent
  ]
})
export class QboAuthLibModule {}
