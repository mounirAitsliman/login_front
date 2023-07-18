import { Component,OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  private roles: string[] | undefined;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string | undefined;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles?.includes('ROLE_ADMIN') ?? false;
      this.showModeratorBoard = this.roles?.includes('ROLE_MODERATOR') ?? false;


      this.username = user.username;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }



}
