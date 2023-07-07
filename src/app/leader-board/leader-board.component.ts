import { Component, OnInit } from '@angular/core';
import { HighScoreService } from '../services/high-score.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit {
  leaderboard!: number[];

  constructor(private highScoreService: HighScoreService) { }

  ngOnInit(): void {
    this.leaderboard = this.highScoreService.getLeaderboard();
  }
}
