import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'presidio-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
