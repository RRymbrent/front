import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { Category } from '../models/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = []; 
  scores: { [categoryId: number]: { completedLevels: number[]; percentage: number } } = {};
  letters =   ['L', 'P', 'G', 'S', 'J', 'K', 'T', 'Z', 'H', 'Q', 'M', 'V', 'I', 'W', 'X', 'U', 'Y', 'C', 'F', 'O', 'D', 'B', 'E', 'A', 'N', 'R', ]
  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit() {
    this.quizService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.scores = this.quizService.getScores();
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  getScorePercentage(categoryId: number): number {
    return this.scores[categoryId]?.percentage || 0; 
  }

  goToLevels(categoryId: number) {
    this.router.navigate(['/categories', categoryId, 'levels']);
  }

  goToPlay() {
    this.router.navigate(['/play']);
  }

  clearLocalStorage() {
  Swal.fire({
    title: 'Are you sure you want to clear your progress?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, clear it!'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      Swal.fire({
        title: 'Cleared!',
        text: 'Local Storage has been cleared.',
        icon: 'success'
      }).then(() => {
        window.location.reload(); 
      });
    }
  });
}

  getCategoryClass(categoryName: string): string {
    return categoryName.toLowerCase().replace(/ /g, '-');
  }
  

}
