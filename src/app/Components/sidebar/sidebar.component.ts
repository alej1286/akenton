import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerMode, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  /* @ViewChild('sidebar') sidenav: MatSidenav;
  mode:boolean = true; */
  constructor() { }

  ngOnInit(): void {
    //this.mode = true;
  }

  setSidebarOpened(str:boolean){
    //this.mode = str;
  }

  toggle(){
    //this.sidenav.toggle();
  }

  setSidebarMode(str:boolean){
    //this.mode= str;
  }



}
