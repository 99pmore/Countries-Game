import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  public score: number = 0
  public highScore: number = 0

  constructor(
    private scoreService: ScoreService
  ) { }

  ngOnInit(): void {
    this.getScore()
    this.getHighScore()
  }

  private getScore(): void {
    this.scoreService.score$.subscribe(
      score => this.score = score
    )
  }

  private getHighScore(): void {
    this.scoreService.highScore$.subscribe(
      highScore => this.highScore = highScore
    )
  }

}
