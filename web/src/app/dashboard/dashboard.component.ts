import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'dashboard',
  styleUrls: ['dashboard.component.css'],
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  ngOnInit() {
    console.log('Инициализация компоненты `Dashboard`');
  }

}
