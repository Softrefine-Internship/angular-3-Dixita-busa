import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnChanges {
  @Input('appTooltip') tooltipText: string = '';
  @Input() tooltipPosition: string = 'top';
  @Input() tooltipColor: string = '#000000';
  @Input() tooltipFontSize: string = '14px';
  
  private tooltipElement: HTMLElement | null = null;

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  ngOnChanges(changes: SimpleChanges) {
    // If tooltip is already shown, update its styling
    if (this.tooltipElement) {
      this.updateTooltipStyle();
    }
  }

  private showTooltip() {
    if (!this.tooltipText) return;

    this.tooltipElement = document.createElement('div');
    this.tooltipElement.textContent = this.tooltipText;
    
    this.updateTooltipStyle();
    this.positionTooltip();
    
    document.body.appendChild(this.tooltipElement);
  }

  private updateTooltipStyle() {
    if (!this.tooltipElement) return;

    // Apply dynamic styling
    this.tooltipElement.style.position = 'absolute';
    this.tooltipElement.style.background = this.tooltipColor;
    this.tooltipElement.style.color = this.getContrastColor(this.tooltipColor);
    this.tooltipElement.style.padding = '5px';
    this.tooltipElement.style.borderRadius = '3px';
    this.tooltipElement.style.fontSize = this.tooltipFontSize;
    this.tooltipElement.style.zIndex = '1000';
  }

  private positionTooltip() {
    if (!this.tooltipElement) return;

    const rect = this.el.nativeElement.getBoundingClientRect();
    
    // Create a temporary element to measure tooltip dimensions
    const tempTooltip = this.tooltipElement.cloneNode(true) as HTMLElement;
    tempTooltip.style.visibility = 'hidden';
    document.body.appendChild(tempTooltip);
    
    const tooltipWidth = tempTooltip.offsetWidth;
    const tooltipHeight = tempTooltip.offsetHeight;
    document.body.removeChild(tempTooltip);

    switch (this.tooltipPosition) {
      case 'top':
        this.tooltipElement.style.top = `${rect.top - tooltipHeight - 5}px`;
        this.tooltipElement.style.left = `${rect.left + (rect.width - tooltipWidth) / 2}px`;
        break;
      case 'bottom':
        this.tooltipElement.style.top = `${rect.bottom + 5}px`;
        this.tooltipElement.style.left = `${rect.left + (rect.width - tooltipWidth) / 2}px`;
        break;
      case 'left':
        this.tooltipElement.style.top = `${rect.top + (rect.height - tooltipHeight) / 2}px`;
        this.tooltipElement.style.left = `${rect.left - tooltipWidth - 5}px`;
        break;
      case 'right':
        this.tooltipElement.style.top = `${rect.top + (rect.height - tooltipHeight) / 2}px`;
        this.tooltipElement.style.left = `${rect.right + 5}px`;
        break;
      default:
        // Default to top positioning
        this.tooltipElement.style.top = `${rect.top - tooltipHeight - 5}px`;
        this.tooltipElement.style.left = `${rect.left + (rect.width - tooltipWidth) / 2}px`;
    }
  }

  private hideTooltip() {
    if (this.tooltipElement) {
      document.body.removeChild(this.tooltipElement);
      this.tooltipElement = null;
    }
  }

  // Helper method to get contrasting text color based on background
  private getContrastColor(hexColor: string): string {
    // Remove the hash at the beginning if it's there
    hexColor = hexColor.replace('#', '');
    
    // Convert hex to RGB
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return black or white based on luminance
    return luminance > 0.5 ? 'black' : 'white';
  }
}