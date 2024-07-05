import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import {MatCardModule} from '@angular/material/card';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { onSnapshot } from "firebase/firestore";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIcon,MatButtonModule,MatTooltipModule,MatDialogModule, MatCardModule],
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

  setUserObject(obj: any): User {
    return new User({
        firstName: obj.firstName || "",
        lastName: obj.lastName || "",
        birthDate: obj.birthDate || "",
        street: obj.street || "",
        zipCode: obj.zipCode || "",
        city: obj.city || ""
    });
}

subUsers() {
    return onSnapshot(this.getUsersRef(), (users) => {
        this.usersList = [];
        users.forEach(element => {
            this.usersList.push(this.setUserObject(element.data()));
        });
    });
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
}
