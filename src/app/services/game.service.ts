import { Injectable } from '@angular/core';
import { Cell } from '../models/cell.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  board: Cell[][] = [];
  gameOver: boolean = false;
  gameWon: boolean = false;
  totalMines: number = 10; // Change this as per your desired number of mines
  timer: number = 0;
  private interval: any;
  restart$: Subject<void> = new Subject<void>();


  constructor() {
    // Initialize the game board and cells
    this.initializeBoard();
    this.startTimer();
  }

  private initializeBoard(): void {
    // Generate the game board with cells and mines
    for (let i = 0; i < 10; i++) {
      this.board[i] = [];
      for (let j = 0; j < 10; j++) {
        const cell: Cell = new Cell(i, j); // Pass row and col parameters
        this.board[i][j] = cell;
      }
    }

    // Randomly place mines on the game board
    let placedMines = 0;
    while (placedMines < this.totalMines) {
      const randomRow = Math.floor(Math.random() * 10);
      const randomCol = Math.floor(Math.random() * 10);
      const cell = this.board[randomRow][randomCol];
      if (!cell.hasMine) {
        cell.hasMine = true;
        placedMines++;
      }
    }

    // Calculate the number of neighboring mines for each cell
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = this.board[i][j];
        if (!cell.hasMine) {
          cell.neighborMines = this.calculateNeighborMines(i, j);
          cell.colorClass = `number-${cell.neighborMines}`;
        }
      }
    }
  }

  private calculateNeighborMines(row: number, col: number): number {
    let count = 0;
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (i >= 0 && i < 10 && j >= 0 && j < 10 && this.board[i][j].hasMine) {
          count++;
        }
      }
    }

    // Subtract 1 from the count if the current cell has a mine
    if (this.board[row][col].hasMine) {
      count--;
    }

    return count;
  }

  private startTimer(): void {
    this.interval = setInterval(() => {
      this.timer++;
    }, 1000);
  }

  revealCell(cell: Cell): void {
    if (!cell.revealed && !cell.flagged && !this.gameOver && !this.gameWon) {
      cell.revealed = true;
      if (cell.hasMine) {
        this.gameOver = true;
        this.stopTimer();
        // Handle game over logic, such as displaying the game over screen
      } else if (cell.neighborMines === 0) {
        // Automatically reveal neighboring cells if the current cell has no neighboring mines
        for (let i = cell.row - 1; i <= cell.row + 1; i++) {
          for (let j = cell.col - 1; j <= cell.col + 1; j++) {
            if (i >= 0 && i < 10 && j >= 0 && j < 10) {
              const neighborCell = this.board[i][j];
              this.revealCell(neighborCell);
            }
          }
        }
      }

      if (this.checkGameWon()) {
        this.gameWon = true;
        // Handle game won logic, such as displaying the victory screen
      }
    }
  }

  toggleFlag(cell: Cell): void {
    if (!cell.revealed && !this.gameOver && !this.gameWon) {
      cell.flagged = !cell.flagged;
    }
  }

  private checkGameWon(): boolean {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = this.board[i][j];
        if (!cell.hasMine && !cell.revealed) {
          return false;
        }
      }
    }
    return true;
  }

  restartGame(): void {
    this.gameOver = false;
    this.gameWon = false;
    this.timer = 0;
    this.board = [];
    this.initializeBoard();
    this.startTimer();
    this.restart$.next();

  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  private stopTimer(): void {
    clearInterval(this.interval);
  }
}
