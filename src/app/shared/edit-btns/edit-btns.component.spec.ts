import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBtnsComponent } from './edit-btns.component';

describe('EditBtnsComponent', () => {
  let component: EditBtnsComponent;
  let fixture: ComponentFixture<EditBtnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBtnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
