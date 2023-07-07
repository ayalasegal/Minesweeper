export class Cell {
    revealed: boolean = false;
    flagged: boolean = false;
    hasMine: boolean = false;
    neighborMines: number = 0;
    row: number;
    col: number;
    colorClass!:string;
    constructor(row: number, col: number) {
      this.row = row;
      this.col = col;
    }
  }
  