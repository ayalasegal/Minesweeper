import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../services/game.service';
import { Subject, timer,Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  private destroyed$: Subject<void> = new Subject<void>();
  private subscription!: Subscription;
  timer: number = 0;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.subscription = timer(0, 1000)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        if (!this.gameService.gameOver && !this.gameService.gameWon) {
          this.timer++;
        }
      });
      this.gameService.restart$.subscribe(() => {
        // Reset the game board
        this.timer=this.gameService.timer;
      });
  }

  resetTimer(): void {
    this.timer = 0;
  }
  

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  getTime(): string {
    const minutes: number = Math.floor(this.timer / 60);
    const seconds: number = this.timer % 60;
    const formattedMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds: string = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  }
}




