
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Good } from '../../good.module';
@Component({
  selector: 'app-good-data',
  templateUrl: './good-data.component.html',
  styleUrls: ['./good-data.component.css']
})
export class GoodDataComponent implements OnInit {

  @Input() public good:Good;



  constructor() { }

  ngOnInit(): void {
  }

}
