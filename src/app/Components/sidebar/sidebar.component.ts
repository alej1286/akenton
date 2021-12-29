import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerMode, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() onButtonClicked: EventEmitter<string> = new EventEmitter();
  /* @ViewChild('sidebar') sidenav: MatSidenav;
  mode:boolean = true; */
  constructor() { }

  ngOnInit(): void {
    //this.mode = true;
  }

  setSidebarOpened(str:boolean){
    //this.mode = str;
  }

  buttonClicked() {
    this.onButtonClicked.emit("Desde el hijo.");  
  }

  toggle(){
    //this.sidenav.toggle();
  }

  setSidebarMode(str:boolean){
    //this.mode= str;
  }



}
