import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgCircleProgressModule, CircleProgressOptions } from 'ng-circle-progress';

@Component({
  selector: 'humidity',
  standalone: true,
  imports: [CommonModule, NgCircleProgressModule],
  providers: [CircleProgressOptions],
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.scss']
})
export class HumidityComponent {
  @Input() humidityPercentage!: number;
}
