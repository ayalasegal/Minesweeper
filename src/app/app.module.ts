import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameBoardComponent } from './game-board/game-board.component';
import { HighScoreService } from './services/high-score.service';
import { GameService } from './services/game.service';
import { LocalStorageService } from './services/local-storage.service';
import { GameOverComponent } from './game-over/game-over.component';
import { TimerComponent } from './timer/timer.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GameOverComponent,
    TimerComponent,
    LeaderBoardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [HighScoreService,GameService,LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
