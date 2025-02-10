import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { Question, Category, Level } from '../models/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  letters = ['K', 'C', 'Q', 'H', 'Y', 'B', '', 'I', 'W', 'V', 'U', 'A', 'X', 'R', 'N', 'P', 'S', 'F', 'J', 'Z', 'L', 'T', 'G', 'M', 'O', 'D', ];
  questions: Question[] = [];
  currentQuestionIndex = 0;
  selectedAnswer: number | null = null;
  error: string = '';
  levelId!: number;
  categoryId!: number;
  levelName!: string;
  categoryName!: string; 
  showFeedback = false;
  isCorrect: boolean = false;
  isLastLevel: boolean = false;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.levelId = +params.get('levelId')!;
      console.log('Initialized Level ID:', this.levelId);
      this.categoryId = +this.route.snapshot.queryParamMap.get('categoryId')!;
      this.loadQuestions(); 
      this.getLevelNameById(this.levelId);
      this.getCategoryNameById(this.categoryId);
      this.checkIfLastLevel();
    });
  }

  getLevelNameById(levelId: number) {
    this.quizService.getLevels(this.categoryId).subscribe({
      next: (levels: Level[]) => {
        const level = levels.find(lvl => lvl.id === levelId);
        if (level) {
          this.levelName = level.name;
        }
      },
      error: (error) => {
        this.error = error.message;
      }
    });
  }

  getCategoryNameById(categoryId: number) {
    this.quizService.getCategories().subscribe({
      next: (categories: Category[]) => {
        const category = categories.find(cat => cat.id === categoryId);
        if (category) {
          this.categoryName = category.name;
        }
      },
      error: (error) => {
        this.error = error.message;
      }
    });
  }

  loadQuestions() {
    this.quizService.getQuestions(this.levelId).subscribe({
      next: (data) => {
        this.questions = data;
      },
      error: (error) => {
        this.error = error.message;
      }
    });
  }

  selectAnswer(answerId: number) {
    if (!this.showFeedback) {
      this.selectedAnswer = answerId;
      this.showFeedback = true;
      const currentQuestion = this.questions[this.currentQuestionIndex];
      const selectedAnswer = currentQuestion.answers.find(a => a.id === answerId);
      this.isCorrect = selectedAnswer?.is_correct || false;

      if (this.isCorrect) {
        const currentScores = this.quizService.getScores();
        const completedLevels = currentScores[this.categoryId]?.completedLevels || [];
        if (!completedLevels.includes(this.levelId)) {
          completedLevels.push(this.levelId);
        }
        const newPercentage = Math.floor((completedLevels.length / this.questions.length) * 20);
        this.quizService.saveScore(this.categoryId, { completedLevels, percentage: newPercentage });
        
        this.markLevelAsCompleted();
      }

      this.showFeedbackModal();
    }
  }

  markLevelAsCompleted() {
    const completedLevels = JSON.parse(localStorage.getItem(`category_${this.categoryId}_completedLevels`) || '[]');
    if (!completedLevels.includes(this.levelId)) {
      completedLevels.push(this.levelId);
      localStorage.setItem(`category_${this.categoryId}_completedLevels`, JSON.stringify(completedLevels));
    }
  }

  showFeedbackModal() {
    const isCorrectText = this.isCorrect ? 'Correct!' : 'Oops, try again!';
    const isCorrectMessage = this.isCorrect ? 'Great job, keep going!' : 'Please review the answer and try again.';
    
    let confirmButtonText = 'Back to Levels';
    let cancelButtonText = 'Try Again';
    let confirmButtonColor = '#3085d6';  
    let cancelButtonColor = '#d33'; 
    let showCancelButton = true;
  
    if (this.isCorrect && !this.isLastLevel) {
      cancelButtonText = 'Next Level';
      cancelButtonColor = 'green';
    } else if (!this.isCorrect) {
      confirmButtonText = 'Back to Levels'; 
      cancelButtonText = 'Try Again';
      cancelButtonColor = 'red';
    } else if (this.isLastLevel) {
      showCancelButton = false;
    }
  
    Swal.fire({
      title: isCorrectText,
      text: isCorrectMessage,
      icon: this.isCorrect ? 'success' : 'error',
      showCancelButton: showCancelButton,  
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      confirmButtonColor: confirmButtonColor, 
      cancelButtonColor: cancelButtonColor,  
      reverseButtons: true,  
      customClass: {
        confirmButton: 'btn-primary',
        cancelButton: 'btn-secondary',
        
      },
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.goBack(); 
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        if (this.isCorrect && !this.isLastLevel) {
          this.goToNextLevel(); 
        } else if (!this.isCorrect) {
          this.selectedAnswer = null; 
          this.showFeedback = false; 
        }
      }
    });

  }
  
  
  

  goBack() {
    this.router.navigate(['/categories', this.categoryId, 'levels']);
  }

  goToNextLevel() {
    const storedLevels: Level[] = JSON.parse(localStorage.getItem(`category_${this.categoryId}_levels`) || '[]');
  
    if (!storedLevels.length || !this.levelId) {
      return;
    }
  
    const currentLevelIndex = storedLevels.findIndex((level: Level) => level.id === this.levelId);
  
    if (currentLevelIndex === -1) {
      return;
    }
  
    const totalLevels = storedLevels.length;
    const nextLevelIndex = currentLevelIndex + 1;
    const nextLevelId = nextLevelIndex < totalLevels ? storedLevels[nextLevelIndex].id : null;

    const isLastLevel = nextLevelId === null;
  
    if (isLastLevel) {
      this.router.navigate([`/categories/${this.categoryId}/levels`]);
    } else {
      this.router.navigate([`/levels/${nextLevelId}/questions`], {
        queryParams: { categoryId: this.categoryId },
      }).then(() => {
        window.location.reload();
      });
    }
  }

  checkIfLastLevel() {
    const storedLevels: Level[] = JSON.parse(localStorage.getItem(`category_${this.categoryId}_levels`) || '[]');
  
    if (!Array.isArray(storedLevels) || storedLevels.length === 0) {
      return;
    }
  
    const currentLevelIndex = storedLevels.findIndex(level => level.id === this.levelId);
    const totalLevels = storedLevels.length;
  
    this.isLastLevel = currentLevelIndex === totalLevels - 1;
  }

  retryQuestion() {
    this.showFeedback = false;
    this.selectedAnswer = null;
    this.showCurrentQuestion(); 
  }

  showCurrentQuestion() {
    const currentQuestion = this.questions[this.currentQuestionIndex];

  }

  
}
