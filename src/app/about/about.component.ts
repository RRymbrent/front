import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  letters = ['N', 'D', 'J', 'T', 'L', 'U', 'B', 'I', 'A', 'F', 'Q', 'K', 'M', 'G', 'C', 'W', 'X', 'Z', 'H', 'V', 'R', 'P', 'Y', 'S', 'E', 'O',]
  constructor(private router: Router) {}

  closePage() {
    this.router.navigate(['/landing'])
  }

 
}
