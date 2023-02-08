import { Injectable } from '@angular/core';
import { BehaviorSubject , Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private scoreSubject = new BehaviorSubject<number>(0)
  public score$: Observable<number> = this.scoreSubject.asObservable()

  constructor() { }

  public incrementScore(): void {
    this.scoreSubject.next(this.scoreSubject.value + 1)
  }

  public resetScore(): void {
    this.scoreSubject.next(0)
  }
}
