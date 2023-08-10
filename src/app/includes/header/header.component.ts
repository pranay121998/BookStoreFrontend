import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  isLogin: Observable<boolean> = this.authService.showHeader;

  ngOnInit(): void {
    // this.isLogin = this.authService.showHeader
  }

  logout() {
    this.authService.logOut()
  }
}
