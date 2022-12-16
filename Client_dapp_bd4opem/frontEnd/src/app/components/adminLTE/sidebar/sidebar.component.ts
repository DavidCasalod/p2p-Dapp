import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public route: string = '';

  constructor(private router: Router, private currentRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.events.subscribe(x => {
      if (x instanceof NavigationStart){
        this.route = x.url;
      }
      
      
    })
  }

  navigateHome(): void {
    this.router.navigate(['/service']);
  }

  navigateForecast(): void {
    this.router.navigate(['/service']);
  }

  navigateCongestions(): void {
    this.router.navigate(['/calculate']);
  }

  navigateReports(): void {
    this.router.navigate(['/query']);
  }

  navigateTest(): void {
    this.router.navigate(['/test']);
  }

}
