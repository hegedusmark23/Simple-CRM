import { Component, inject } from '@angular/core';
import { doc, Firestore, docData } from '@angular/fire/firestore';
import { MatCard } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAdressComponent } from '../dialog-edit-adress/dialog-edit-adress.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCard, 
    MatCardModule, 
    MatIcon,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'] // Fixed typo from styleUrl to styleUrls
})
export class UserDetailComponent {
  firestore: Firestore = inject(Firestore);
  userId: string = '';
  user: User = new User;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id') || '';
      this.getUser();
    });
  }

  getUser() {
    const userDocRef = doc(this.firestore, `users/${this.userId}`);
    docData(userDocRef).subscribe((user: any) => {
      this.user = new User(user);
    });
  }

  editMenu() {
    const dialog = this.dialog.open(DialogEditAdressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
  }
}
