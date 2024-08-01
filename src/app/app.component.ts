import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';

import { HttpClientModule, HttpClient } from '@angular/common/http'; 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,UserListComponent, HttpClientModule],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'my-angular-app';
}
