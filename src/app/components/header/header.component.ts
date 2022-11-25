import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {
    token: window.localStorage.getItem('token');
  }

  token: string | null = window.localStorage.getItem('token');

  logout() {
    window.localStorage.clear();
    window.location.reload();
  }

  ngOnInit(): void {}

  ngOnChange(): void {}
}
