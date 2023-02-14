import { Component, OnInit } from '@angular/core';
import { Country } from '../../models/country.interface'
import { CountriesService } from 'src/app/services/countries.service';
import { ScoreService } from 'src/app/services/score.service';
import Swal from 'sweetalert2';

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

  private selectedCountries!: Country[]
  private countriesCount!: number

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

        if (this.selectedCountries.length === this.countriesCount) {
          Swal.fire({
            imageUrl: '../../../assets/img/trophy.webp',
            imageHeight: 100,
            imageAlt: 'Trophy icon',
            title: 'Congratulations!',
            text: "You've hit all the flags!",
            confirmButtonText: 'Continue',
            showDenyButton: true,
            denyButtonText: `Restart`,

          }).then((result) => {
            if (result.isConfirmed) {
              this.selectedCountries = []
              this.generateRandomCountries()
              this.randomCountryName()
              this.result = ''

            } else if (result.isDenied) {
              this.scoreService.resetScore()
              this.selectedCountries = []
              this.generateRandomCountries()
              this.randomCountryName()
              this.result = ''
            }
          })
        }
        
        this.generateRandomCountries()
        this.randomCountryName()
        this.result = ''
        
      } else {
        this.scoreService.resetScore()
        this.selectedCountries = []
        this.generateRandomCountries()
        this.randomCountryName()
        this.result = ''
      }
    }, 750)
  }
  

  private getCountries(): void {
    this.countryService.getCountries().subscribe(
      {
        next: (response) => {
          this.countries = response
          this.countriesCount = this.countries.length
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
