import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-3';
  
  tooltipPosition: string = 'top';
  tooltipColor: string = '#000000';
  tooltipFontSize: string = '14'; // Keep as string to match HTML
  trimmedText: string = '';

  // Optional: Add methods to handle changes if needed
  onTooltipPositionChange(value: string) {
    this.tooltipPosition = value;
  }

  onTooltipColorChange(value: string) {
    this.tooltipColor = value;
  }

  onTooltipFontSizeChange(value: string) {
    this.tooltipFontSize = value;
  }
}