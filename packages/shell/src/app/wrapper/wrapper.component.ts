import { AfterContentInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const registry = {
  react_app: () => import('react_app/App')
};

@Component({
  template: '<div #vc></div>',
  styles: [`:host {height: 100%; } div { height: 100%; }`]
})
export class WrapperComponent implements AfterContentInit {

  @ViewChild('vc', {read: ElementRef, static: true})
  vc: ElementRef | undefined;

  constructor(private route: ActivatedRoute) { }

  ngAfterContentInit(): void {

    const elementName = this.route.snapshot.data['elementName'];
    const importName = this.route.snapshot.data['importName'];

    const importFn = (registry as any)[importName];
    importFn()
        // eslint-disable-next-line no-restricted-syntax
      .then(() => console.debug(`element ${elementName} loaded!`))
      .catch((err: any) => console.error(`error loading ${elementName}:`, err));

    const element = document.createElement(elementName);
    this.vc?.nativeElement.appendChild(element);

  }

}
