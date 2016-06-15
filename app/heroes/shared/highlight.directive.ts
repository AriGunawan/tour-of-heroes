import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[tohHighlight]',
    host: {
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()'
    }
})
export class HighlightDirective {
    private defaultColor = '#607d8b';
    private el: HTMLElement;

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
    }

    @Input('tohHighlight') highlightColor: string;

    onMouseEnter() { this.highlight(this.highlightColor || this.defaultColor); }
    onMouseLeave() { this.highlight(null); }

    private highlight(color: string) {        
        this.el.style.color = color;
    }
}