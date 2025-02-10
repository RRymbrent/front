import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { Level } from '../models/interfaces';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss']
})
export class LevelsComponent implements OnInit {
  letters =   ['K', 'C', 'Q', 'H', 'Y', 'B', 'E', 'I', 'W', 'V', 'U', 'A', 'X', 'R', 'N', 'P', 'S', 'F', 'J', 'Z', 'L', 'T', 'G', 'M', 'O', 'D',];
  levels: Level[] = [];
  categoryId!: number;
  error: string = '';

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.categoryId = +this.route.snapshot.paramMap.get('categoryId')!;
    this.loadLevels();
  }

  loadLevels() {
    this.quizService.getLevels(this.categoryId).subscribe({
      next: (data) => {
        const completedLevels = this.quizService.getScores();
        this.levels = data.map(level => ({
          ...level,
          completed: !!completedLevels[level.id]
        }));
      },
      error: (error) => this.error = error.message
    });
  }

  selectLevel(levelId: number) {
    this.router.navigate(['/levels', levelId, 'questions'], {
      queryParams: { categoryId: this.categoryId }
    });
  }

  goBack() {
    this.router.navigate(['/categories']);
  }

  getButtonClass(levelId: number): string {
    const completedLevels = this.quizService.getScores(); 
    const isLevelCompleted = completedLevels[this.categoryId]?.completedLevels?.includes(levelId);
  
    if (isLevelCompleted) {
      return 'completed'; 
    }
  
    return 'in-progress'; 
  }


}
