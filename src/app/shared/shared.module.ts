import { EditBtnsComponent } from './edit-btns/edit-btns.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [EditBtnsComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [EditBtnsComponent],
})
export class SharedModule {}
