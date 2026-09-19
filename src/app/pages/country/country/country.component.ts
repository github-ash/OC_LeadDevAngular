import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OlympicDataService } from '../../../services/data.service';
import { Olympic } from '../../../models/olympic.model';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  public selectedCountry?: Olympic;
  public errorMessage = '';
  public years: number[] = [];
  public medals: number[] = [];
  public totalMedals = 0;
  public totalAthletes = 0;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dataService: OlympicDataService,
  ) {}

  ngOnInit(): void {
    const countryName = this.route.snapshot.paramMap.get('countryName');
    if (!countryName) {
      this.router.navigate(['/not-found']);
      return;
    }

    this.dataService.getCountryByName(countryName).subscribe({
      next: (Olympic) => {
        if (!Olympic) {
          this.router.navigate(['/not-found']);
          return;
        }
        this.selectedCountry = Olympic;
        this.years = Olympic.participations.map(({ year }) => year);
        this.medals = Olympic.participations.map(({ medalsCount }) => medalsCount);
        this.totalMedals = this.medals.reduce((total, medals) => total + medals, 0);
        this.totalAthletes = Olympic.participations
          .reduce((total, { athleteCount }) => total + athleteCount, 0);
      },
      error: (error: Error) => {
        this.errorMessage = `Impossible de charger les données : ${error.message}`;
      },
    });
  }
}
