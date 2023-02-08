import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  public score: number = 0

  constructor(
    private scoreService: ScoreService
  ) { }

  ngOnInit(): void {
    this.getScore()
  }

  private getScore(): void {
    this.scoreService.score$.subscribe(
      score => this.score = score
    )
  }

}
