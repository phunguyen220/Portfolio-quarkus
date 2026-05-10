import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NotificationComponent } from '../notification/notification.component';
import { Profile } from '../../model/profile';
import { ProfileServiceService } from '../../service/profile-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterOutlet, NotificationComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  idProfileNumber: number | undefined;
  userCurrent: any;
  profile?: Profile;
  showNotifications = false;

  constructor(
    private router: Router,
    private profileService: ProfileServiceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userCurrentString = localStorage.getItem('userCurrent');

      if (userCurrentString) {
        this.userCurrent = JSON.parse(userCurrentString);
        console.log('User Current:', this.userCurrent);

        this.getUserProfile();

        if (this.userCurrent?.id) {
          console.log(this.userCurrent.id);
        }
      }
    }
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userCurrent');
      localStorage.removeItem('authToken');
      localStorage.removeItem('idProfileUser');
    }

    this.router.navigate(['/login']);
  }

  getProfileImage(): string {
    if (this.profile?.url) {
      return this.profile.url;
    }

    return 'http://res.cloudinary.com/dgts7tmnb/image/upload/v1723548301/pi41b4rynddelbwfecle.jpg';
  }

  getUserProfile(): void {
    if (this.userCurrent?.id) {
      this.profileService.getProfileByUserId(this.userCurrent.id).subscribe({
        next: (profile: Profile) => {
          this.profile = profile;
          this.idProfileNumber = profile.id;

          if (this.idProfileNumber && isPlatformBrowser(this.platformId)) {
            localStorage.setItem('idProfileUser', this.idProfileNumber + '');
          }

          console.log('Profile:', this.profile);
        },
        error: (error) => {
          console.error('Error loading profile:', error);
        }
      });
    }
  }
}