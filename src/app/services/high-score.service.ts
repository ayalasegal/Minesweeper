import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HighScoreService {
  private leaderboardKey: string = 'minesweeper_leaderboard';

  saveScore(score: number): void {
    const leaderboard = this.getLeaderboard();
    leaderboard.push(score);
    leaderboard.sort((a, b) => a - b);
    localStorage.setItem(this.leaderboardKey, JSON.stringify(leaderboard));
  }

  getLeaderboard(): number[] {
    const leaderboardData = localStorage.getItem(this.leaderboardKey);
    return leaderboardData ? JSON.parse(leaderboardData) : [];
  }

  clearLeaderboard(): void {
    localStorage.removeItem(this.leaderboardKey);
  }
}
