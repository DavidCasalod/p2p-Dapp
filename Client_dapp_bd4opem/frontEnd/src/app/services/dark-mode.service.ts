import { Injectable, OnChanges, SimpleChanges } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  active: boolean = false;

  constructor() { }

}
