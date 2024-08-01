
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from './user.model';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import { trigger, transition, style, animate } from '@angular/animations';


// Author Rahma Samy 
//I want to note that i didn't use angular before 
//I applied for front end role using reacts js ,also I do as much as I can for finishing that project by searching and understanding Angular fundmentals 
//So don't forget to give me feedback please!


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgFor,
    NgIf,MatInputModule,MatFormFieldModule,MatToolbarModule
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms', style({  transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('330ms', style({ transform: 'translateY(10px)' }))
      ])
    ])
  ]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  currentPage = 1;
  isLoading = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getUsers(this.currentPage);
  }

  public getUsers(page: number) {
    this.isLoading = true;
    this.http.get<any>(`https://reqres.in/api/users?page=${page}`).subscribe(res => {
      this.users = res.data;
      this.isLoading = false;
    });
  }

  public viewDetails(id: number) {
    this.router.navigate(['/user', id]);
  }

  public nextPage() {
    this.currentPage++;
    this.getUsers(this.currentPage);
  }

  public prevPage() {
    this.currentPage--;
    this.getUsers(this.currentPage);
  }

  public onSearch(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    const userId = Number(input);

    if (userId) {
      this.isLoading = true;
      this.getUserById(userId).subscribe({
        next: (user: User) => {
          if (user) {
            this.router.navigate(['/user', user.id]);
          } else {
            alert('User not found');
          }
          this.isLoading = false;
        },
        error: (err: any) => {
          alert('Error fetching user');
          console.error(err);
          this.isLoading = false;
        }
      });
    }
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<any>(`https://reqres.in/api/users/${id}`).pipe(
      switchMap(res => of(res.data))
    );
  }
}
