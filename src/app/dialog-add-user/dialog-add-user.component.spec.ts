import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddUserComponent } from './dialog-add-user.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';

describe('DialogAddUserComponent', () => {
  let component: DialogAddUserComponent;
  let fixture: ComponentFixture<DialogAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddUserComponent],
      providers:[
        {provide: MatDialogRef, useValue:{}},
        { provide: Firestore, useValue: {} }
     ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
