

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../user-list/user.model'; // Ensure the path is correct
import { Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  imports: [NgIf,CommonModule, HttpClientModule,MatToolbarModule, MatToolbarModule, MatIconModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
    MatTooltipModule,
    MatGridListModule,
    MatMenuModule,
    MatCardModule,MatFormFieldModule,MatInputModule],
  standalone: true,
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  public getUser(id: number): Observable<any> {
    console.log("hhhhhhh");
    return this.http.get<any>(`https://reqres.in/api/users/${id}`);
  }
  
  goBack(): void {
    this.router.navigate(['/']); // Navigate back to the main user list page
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.getUser(id).subscribe(response => {
      console.log(response);
      this.user = response.data; // Extract user data from the response
    });
  }
}
