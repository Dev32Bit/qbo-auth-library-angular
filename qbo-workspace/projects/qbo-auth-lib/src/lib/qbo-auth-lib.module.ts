import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { QboAuthComponent } from './qbo-auth-lib.component';
@NgModule({
  declarations: [QboAuthComponent],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [QboAuthComponent]
})
export class QboAuthLibModule { }
