import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements AfterViewInit, OnDestroy {
  @Input() labels: number[] = [];
  @Input() values: number[] = [];
  @ViewChild('canvas', { static: true }) private canvas!: ElementRef<HTMLCanvasElement>;

  private chart?: Chart<'line', number[], number>;

  ngAfterViewInit(): void {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Médailles',
          data: this.values,
          backgroundColor: '#0b868f',
          borderColor: '#0b868f',
        }],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
