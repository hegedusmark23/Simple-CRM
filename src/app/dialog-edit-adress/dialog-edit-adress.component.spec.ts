import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditAdressComponent } from './dialog-edit-adress.component';
import { MatDialogRef  } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('DialogEditAdressComponent', () => {
  let component: DialogEditAdressComponent;
  let fixture: ComponentFixture<DialogEditAdressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditAdressComponent],
      providers:[
        {provide: MatDialogRef, useValue:{},Firestore},
        { provide: Firestore, useValue: {} },
        provideAnimations()
     ]
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
