import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule,
    CommonModule
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {

  firestore: Firestore = inject(Firestore);
  userCollection = collection(this.firestore, 'users')
  user: User = new User();
  birthDate: Date = new Date();
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {

  }

  onNoClick() {
    this.dialogRef.close();
  }

  addUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true;
    this.uploadUser();

  }

  async uploadUser() {
    await addDoc(this.userCollection, this.user.toJSON()).catch(
      (err) => { console.error(err) }
    ).then(
      (docRef) => {
        this.loading = true;
        console.log('User added with ID:', docRef);
        this.dialogRef.close();
      }
    )
  }

}
