import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private cookieService:CookieService,
  ) { }

  ngOnInit() {
  }

  logout(){
    this.cookieService.set('token', '');
  }

  toggleMenu() {
     var sidebar = document.getElementById("sidebar");
     sidebar.classList.toggle("active");
     var content = document.getElementById("content");
     content.classList.toggle("active");
  }

}
