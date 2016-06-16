import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
    selector: '[tohHighlight]'
})
export class HighlightDirective {
    private defaultColor = '#607d8b';
    private el: HTMLElement;

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
    }

    @Input() tohHighlight: string;

    @HostListener('mouseenter') onMouseEnter() { this.highlight(this.tohHighlight || this.defaultColor); }
    @HostListener('mouseleave') onMouseLeave() { this.highlight(null); }

    private highlight(color: string) {        
        this.el.style.color = color;
    }
}