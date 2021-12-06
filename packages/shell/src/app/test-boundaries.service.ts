import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestBoundariesService {

  constructor() { }

  notAllowed() {
    console.log('foo');
  }
}
