import { Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-how-to-play',
  templateUrl: './how-to-play.component.html',
  styleUrls: ['./how-to-play.component.scss']
})
export class HowToPlayComponent {
  letters =   ['L', 'P', 'G', 'S', 'J', 'K', 'T', 'Z', 'H', 'Q', 'M', 'V', 'I', 'W', 'X', 'U', 'Y', 'C', 'F', 'O', 'D', 'B', 'E', 'A', 'N', 'R', ]
    constructor(private router: Router) {}
  
    closePage() {
      this.router.navigate(['/landing'])
    }

    playPage() {
      this.router.navigate(['/play'])
    }

}
