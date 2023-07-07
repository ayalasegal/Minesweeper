import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private gameKey: string = 'minesweeper_game';

  saveGameState(gameState: any): void {
    localStorage.setItem(this.gameKey, JSON.stringify(gameState));
  }

  loadGameState(): any {
    const savedGameState = localStorage.getItem(this.gameKey);
    return savedGameState ? JSON.parse(savedGameState) : null;
  }

  clearGameState(): void {
    localStorage.removeItem(this.gameKey);
  }
}
