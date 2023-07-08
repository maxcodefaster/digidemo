import {
  AfterViewInit, Component, Input, OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss'],
  standalone: true,
})
export class ProgressSpinnerComponent implements AfterViewInit, OnChanges {
  @Input() progress = 0;
  @Input() size = '20px';
  @Input() delay = '1000ms';
  @Input() strokeWidth = 3.5;
  @Input() color = 'var(--ion-text-color)';
  public strokeDashOffset = 100;

  ngAfterViewInit() {
    this.setProgress();
  }

  ngOnChanges() {
    this.setProgress();
  }

  private setProgress() {
    this.strokeDashOffset = Math.floor(100 - (this.progress * 100));
  }
}
