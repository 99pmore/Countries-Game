import { Component, OnInit } from '@angular/core';
import { Country } from '../../models/country.interface'
import { CountriesService } from 'src/app/services/countries.service';
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-flags',
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.scss']
})
export class FlagsComponent implements OnInit {

  public countries!: Country[]
  public randomCountries!: Country[]
  public randomName!: string
  public result!: string
  public selectedCountries!: Country[]

  constructor(
    private countryService: CountriesService,
    private scoreService: ScoreService
  ) { }

  ngOnInit(): void {
    this.getCountries()
  }
  
  public correctFlag(name: string): void {
    this.result = name === this.randomName ? "Correct!" : "Wrong"
    setTimeout(() =>{
      if (this.result === "Correct!") {
        this.scoreService.incrementScore()
        const country = this.randomCountries.find(country => country.name.common === this.randomName)
        if (country) {
          this.selectedCountries.push(country)
        }
        this.generateRandomCountries()
        this.randomCountryName()
        this.result = ''
        
      } else {
        this.scoreService.resetScore()
        this.generateRandomCountries()
        this.randomCountryName()
        this.result = ''
      }
    }, 750)
  }
  

  private getCountries(): void {
    this.countryService.getCountry().subscribe(
      {
        next: (response) => {
          this.countries = response
          this.selectedCountries = []
          this.generateRandomCountries()
          this.randomCountryName()
        }
      }
    )
  }
  
  private generateRandomCountries(): void {
    this.randomCountries = this.countries
      .filter(country => !this.selectedCountries.includes(country))
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
  }
  
  private randomCountryName(): void {
    const randomIndex = Math.floor(Math.random() * this.randomCountries.length)
    this.randomName = this.randomCountries[randomIndex].name.common
  }
  
}
