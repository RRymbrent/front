import { Component} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  letters = ['J', 'F', 'Q', 'P', 'W', 'R', 'S', 'X', 'T', 'A', 'L', 'G', 'C', 'B', 'Y', 'E', 'U', 'O', 'D', 'Z', 'K', 'H', 'I', 'M', 'N', 'V', ];
  ngOnInit(): void {
    const isAlertShown = sessionStorage.getItem('alertShown');

    if (!isAlertShown) {
      Swal.fire({
        title: 'Welcome',
        text: 'This web app is designed to serve as a personal supplementary tool to help students enhance their Kapampangan vocabulary',
        imageUrl: '/assets/icon.png', 
        imageWidth: 150, 
        imageHeight: 150,
        confirmButtonText: 'OK',
        confirmButtonColor: '#BB3E03',
        customClass: {
          title: 'swal-custom-title',
          htmlContainer: 'swal-custom-text'
        }
      });

      sessionStorage.setItem('alertShown', 'true');
    }
  }

  constructor(private router: Router) {}
  goToPlay() {
    this.router.navigate(['/play'])
  }

  goToAbout() {
    this.router.navigate(['/about'])
  }

  goTohow() {
    this.router.navigate(['/how-to-play'])
  }

  

}
