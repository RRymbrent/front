import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category, Level, Question } from '../models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class QuizService {
    private baseUrl = 'http://localhost:8000';
    constructor(private http: HttpClient) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.baseUrl}/categories`)
            .pipe(catchError(this.handleError));
    }

    getQuestions(levelId: number): Observable<Question[]> {
        return this.http.get<Question[]>(`${this.baseUrl}/levels/${levelId}/questions`)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        console.error('An error occurred:', error.error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
    }
    saveScore(categoryId: number, score: { completedLevels: number[]; percentage: number }) {
        const scores = this.getScores();
        scores[categoryId] = score;
        localStorage.setItem('quiz_scores', JSON.stringify(scores));
      }
      
      getScores(): { [key: number]: { completedLevels: number[]; percentage: number } } {
        const scores = localStorage.getItem('quiz_scores');
        return scores ? JSON.parse(scores) : {};
      }

      getTotalLevels(categoryId: number): number {
        const levels = localStorage.getItem(`category_${categoryId}_levels`);
        
        if (levels) {
          const parsedLevels = JSON.parse(levels);
          console.log('Levels from LocalStorage:', parsedLevels);  
          return parsedLevels.length;
        }
        
        return 0;  
      }
      
      getLevels(categoryId: number): Observable<Level[]> {
        return this.http.get<Level[]>(`${this.baseUrl}/categories/${categoryId}/levels`).pipe(
          tap((levels: Level[]) => {
            console.log('Fetched Levels from API:', levels); 
            localStorage.setItem(`category_${categoryId}_levels`, JSON.stringify(levels));
          }),
          catchError(this.handleError)
        );
      }
      

    }
