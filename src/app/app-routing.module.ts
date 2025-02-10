import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { LevelsComponent } from './levels/levels.component';
import { QuestionsComponent } from './questions/questions.component';
import { LandingComponent } from './landing/landing.component';
import { AboutComponent } from './about/about.component';
import { HowToPlayComponent } from './how-to-play/how-to-play.component';
import { PlayComponent } from './play/play.component';
import { FlipCardsComponent } from './flip-cards/flip-cards.component';


const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'play', component: PlayComponent },
  { path: 'about', component: AboutComponent },
  { path: 'how-to-play', component: HowToPlayComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/:categoryId/levels', component: LevelsComponent },
  { path: 'levels/:levelId/questions', component: QuestionsComponent },
  { path: 'flip-cards', component: FlipCardsComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
