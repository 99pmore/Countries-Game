import { Component, OnInit } from '@angular/core';
import { Country } from '../../models/country.interface'
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-flags',
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.scss']
})
export class FlagsComponent implements OnInit {

  public countries!: Country[]
  public randomCountries!: Country[]
  public randomName!: string

  constructor(
    private countryService: CountriesService
  ) { }


  ngOnInit(): void {
    this.getCountries()
  }
  
  private getCountries(): void {
    this.countryService.getCountry().subscribe(
      {
        next: (response) => {
          this.countries = response
          this.generateRandomCountries()
          this.randomCountryName()
        }
      }
    )
  }
  
  private generateRandomCountries(): void {
    this.randomCountries = this.countries
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
  }
  
  private randomCountryName(): void {
    const randomIndex = Math.floor(Math.random() * this.randomCountries.length)
    this.randomName = this.randomCountries[randomIndex].name.common
  }

  public checkRightAnswer(): void {
    
  }
  
}
