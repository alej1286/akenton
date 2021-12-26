import { AfterViewInit, Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver} from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav';

import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements AfterViewInit, OnInit {
 /* S */
 @Input() deviceXs: boolean;
 @ViewChild('sidebar') sidenav: MatSidenav;
 screenWidth: number;
 private screenWidth$ = new BehaviorSubject<number>(window.innerWidth);
@HostListener('window:resize', ['$event'])
    onResize(event) {
        this.screenWidth$.next(event.target.innerWidth);
    }

  constructor(private observer : BreakpointObserver) { }
  ngAfterViewInit(): void {
    if(!this.deviceXs){

     /// this.sidenav.mode ='side';
     /*  this.sidebar.setSidebarOpened(false);
      this.sidebar.setSidebarMode(false); */
      
    }
    else{
      //this.sidenav.mode ='over';
     /*  this.sidebar.setSidebarOpened(true);
      this.sidebar.setSidebarMode(true); */
      
    }
  }
toggle(){
  this.sidenav.toggle();
}


  ngOnInit() {
    this.screenWidth$.subscribe(width => {
      this.screenWidth = width;
    });
  }
   
}