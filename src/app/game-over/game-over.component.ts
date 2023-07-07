import { Component } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css']
})
export class GameOverComponent {
  constructor(public gameService: GameService) {}

  restartGame(): void {
    this.gameService.restartGame();
  }
  
  
}
