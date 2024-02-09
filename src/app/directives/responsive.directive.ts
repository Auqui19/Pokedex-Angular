import { Directive, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Directive({
  selector: '[appResponsive]',
  standalone: true
})
export class ResponsiveDirective {

  constructor(private _element: ElementRef, private _breakpointObserver: BreakpointObserver) {
    this._breakpointObserver.observe([Breakpoints.HandsetPortrait, Breakpoints.WebLandscape]).subscribe({
      next: (result: any) => {
        for (let breakpoint of Object.keys(result.breakpoints)) {
          if (result.breakpoints[breakpoint]) {
            if (breakpoint === Breakpoints.HandsetPortrait) {
              this._element.nativeElement.classList.remove('pc');
            }
            if (breakpoint === Breakpoints.WebLandscape) {
              this._element.nativeElement.classList.add('pc');
            }
          }
        }
      }
    })
  }

}
