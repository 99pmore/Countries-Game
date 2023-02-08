import { Injectable } from '@angular/core';
import { BehaviorSubject , Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private scoreSubject = new BehaviorSubject<number>(0)
  public score$: Observable<number> = this.scoreSubject.asObservable()

  private highScoreSubject = new BehaviorSubject<number>(0)
  public highScore$: Observable<number> = this.highScoreSubject.asObservable()


  constructor() { }

  public incrementScore(): void {
    this.scoreSubject.next(this.scoreSubject.value + 1)
    this.updateHighScore(this.scoreSubject.value)
  }
  
  public resetScore(): void {
    this.scoreSubject.next(0)
    this.updateHighScore(0)
  }
  
  private updateHighScore(currentScore: number): void {
    const highScore = Number(localStorage.getItem('highScore')) || 0
    this.highScoreSubject.next(highScore)
    if (currentScore > highScore) {
      localStorage.setItem('highScore', currentScore.toString())
    }
  }
}
