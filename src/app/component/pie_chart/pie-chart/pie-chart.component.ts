import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements AfterViewInit, OnDestroy {
  @Input() labels: string[] = [];
  @Input() values: number[] = [];
  @Output() countrySelected = new EventEmitter<string>();
  @ViewChild('canvas', { static: true }) private canvas!: ElementRef<HTMLCanvasElement>;

  private chart?: Chart<'pie', number[], string>;

  ngAfterViewInit(): void {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'pie',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Médailles',
          data: this.values,
          backgroundColor: ['#0b868f', '#adc3de', '#7a3c53', '#8f6263', 'orange', '#94819d'],
        }],
      },
      options: {
        aspectRatio: 2.5,
        onClick: (_, elements) => {
          const selectedIndex = elements[0]?.index;
          const selectedCountry = selectedIndex === undefined ? undefined : this.labels[selectedIndex];
          if (selectedCountry) {
            this.countrySelected.emit(selectedCountry);
          }
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
