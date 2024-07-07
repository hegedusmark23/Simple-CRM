import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { collection, doc, Firestore, updateDoc,  } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule,
    CommonModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {

  firestore: Firestore = inject(Firestore);
  loading: boolean = false;
  user!: User;
  birthDate!: Date;
  userCollection = collection(this.firestore, 'users')
  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {

  }

  async updateUser(user: User) {
    if (user.id) {
      await updateDoc(this.getSingleDocRef(user.id), user.toJSON()).catch(
        (err) => {
          console.log(err);
        });
    }
  }
  
  getSingleDocRef( docId: string) {
    return doc(collection(this.firestore, 'users'), docId);
  }
  
  onNoClick() {
    this.dialogRef.close();
  }

  saveUser() {
    this.updateUser(this.user)
  }
}
