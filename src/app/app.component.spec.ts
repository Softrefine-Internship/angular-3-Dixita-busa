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
  tooltipFontSize: number = 14;
  trimmedText: string = '';
}