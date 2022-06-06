import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DarkModeService } from './services/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'css-test';

  constructor(public darkMode: DarkModeService) { };
  
}

