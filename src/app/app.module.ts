import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Ensure this is imported

import { AppComponent } from './app.component';
import { HighlightDirective } from './directives/highlight.directive';
import { TrimDirective } from './directives/trim.directive';
import { TooltipDirective } from './directives/tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    TrimDirective,
    TooltipDirective
  ],
  imports: [
    BrowserModule,
    FormsModule // Make sure FormsModule is in the imports array
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }