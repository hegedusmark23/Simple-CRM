import { Component, inject } from '@angular/core';
import { doc, Firestore, docData } from '@angular/fire/firestore';
import { MatCard } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCard, MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'] // Fixed typo from styleUrl to styleUrls
})
export class UserDetailComponent {
  firestore: Firestore = inject(Firestore);
  userId: string = '';
  user: User = new User();

  constructor(private route: ActivatedRoute) {}

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
}
