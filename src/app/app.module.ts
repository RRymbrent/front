import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { LevelsComponent } from './levels/levels.component';
import { QuestionsComponent } from './questions/questions.component';
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './landing/landing.component';
import { AboutComponent } from './about/about.component';
import { HowToPlayComponent } from './how-to-play/how-to-play.component';
import { PlayComponent } from './play/play.component';
import { FlipCardsComponent } from './flip-cards/flip-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    LevelsComponent,
    QuestionsComponent,
    LandingComponent,
    AboutComponent,
    HowToPlayComponent,
    PlayComponent,
    FlipCardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
