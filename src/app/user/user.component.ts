import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import {MatCardModule} from '@angular/material/card';
import { collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { onSnapshot } from "firebase/firestore";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIcon,MatButtonModule,MatTooltipModule,MatDialogModule, MatCardModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  unsubUsers;
  firestore: Firestore = inject(Firestore);
  user: User = new User();
  usersList: User[] = []
  
  constructor(public dialog: MatDialog){
    this.unsubUsers = this.subUsers();
  }

  setUserObject(obj: any, id: string): User {
    return new User({
        id: id,
        firstName: obj.firstName || "",
        lastName: obj.lastName || "",
        birthDate: obj.birthDate || "",
        street: obj.street || "",
        zipCode: obj.zipCode || "",
        city: obj.city || "",
        email: obj.email || ""
    });
}

subUsers() {
  return onSnapshot(this.getUsersRef(), (users) => {
    this.usersList = [];
    users.forEach(element => {
      const userData = element.data();
      userData['id'] = element.id;
      this.usersList.push(this.setUserObject(userData, element.id));
    });
  });
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

  ngonDestroy(){
     this.unsubUsers();
  }

  openDialog(){
    this.dialog.open(DialogAddUserComponent)
  }

  getUsersRef(){
    return collection(this.firestore, 'users')
  }

  getUsersId(colId:string, docId:string){
    return doc(collection(this.firestore, colId), docId)
  }
}
