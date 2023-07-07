import { Component,ChangeDetectorRef, OnInit } from '@angular/core';
import { Cell } from '../models/cell.model';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit{
  board: Cell[][] = [];
  constructor(private gameService: GameService) {
    this.board = this.gameService.board;
  }
  ngOnInit(): void {
    this.gameService.restart$.subscribe(() => {
      this.board=this.gameService.board;
    });  }
  

  revealCell(cell: Cell): void {
    this.gameService.revealCell(cell);
  }

  toggleFlag(event: Event, cell: Cell): void {
    event.preventDefault();
    this.gameService.toggleFlag(cell);
  }
}
