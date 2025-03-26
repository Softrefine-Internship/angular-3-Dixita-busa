import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTrim]'
})
export class TrimDirective {
  constructor(
    private el: ElementRef, 
    private control: NgControl
  ) {}

  @HostListener('blur') onBlur() {
    const value = this.el.nativeElement.value;
    const trimmedValue = value.trim();
    
    this.el.nativeElement.value = trimmedValue;
    
    if (this.control && this.control.control) {
      this.control.control.setValue(trimmedValue);
    }
  }
}