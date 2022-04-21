import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { faCheck, faClose, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'edit-field-btns',
  templateUrl: './edit-btns.component.html',
  styleUrls: ['./edit-btns.component.scss'],
})
export class EditBtnsComponent implements OnInit {
  @Output() editDetails = new EventEmitter<any>();
  @Output() filePick = new EventEmitter();
  @Input() isEditing: boolean = false;
  @Input() isControlInvalid: boolean = false;
  @Input() field: string = '';
  @Input() isFilePicker: boolean = false;

  faPen = faPen;
  faCheck = faCheck;
  faClose = faClose;

  constructor() {}

  ngOnInit(): void {}
}
