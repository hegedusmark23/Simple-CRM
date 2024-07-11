import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditAdressComponent } from './dialog-edit-adress.component';
import {   MatDialogRef } from '@angular/material/dialog';

describe('DialogEditAdressComponent', () => {
  let component: DialogEditAdressComponent;
  let fixture: ComponentFixture<DialogEditAdressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditAdressComponent],
      providers: [MatDialogRef]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
