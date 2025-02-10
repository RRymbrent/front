import { Component, HostListener} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent {
  cards = Array(10).fill('?');
  letters =   ['N', 'D', 'B', 'R', 'A', 'H', 'X', 'Y', 'K', 'S', 'V', 'M', 'C', 'U', 'G', 'Z', 'F', 'O', 'L', 'Q', 'E', 'P', 'T', 'J', 'W', 'I', ];
  visibleCards = this.cards;
  isMobile = false;
  constructor(private router: Router) {}
  
  ngOnInit() {
  
  }
    closePage() {
      this.router.navigate(['/landing'])
    }

    categoryPage() {
      this.router.navigate(['/categories'])
    }

    playFlipcards() {
      this.router.navigate(['/flip-cards'])
    }




  
}
