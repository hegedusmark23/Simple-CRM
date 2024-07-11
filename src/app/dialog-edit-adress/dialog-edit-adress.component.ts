import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-edit-adress',
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
  templateUrl: './dialog-edit-adress.component.html',
  styleUrl: './dialog-edit-adress.component.scss'
})
export class DialogEditAdressComponent {
  firestore: Firestore = inject(Firestore);
  loading: boolean = false;
  user!: User;

  constructor(public dialogRef: MatDialogRef<DialogEditAdressComponent>) {

  }

  onNoClick() {
    this.dialogRef.close();
  }

  async updateAdress(user: User) {
    await updateDoc(this.getSingleDocRef(user.id), user.toJSON()).catch(
      (err) => {
        console.log(err, user);
      }).then( () => {
        this.loading = false;
        this.dialogRef.close();
      });
}

saveAdress() {
  this.updateAdress(this.user)
}

getSingleDocRef( docId: string) {
  return doc(collection(this.firestore, 'users'), docId);
}

}