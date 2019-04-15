import { Component, OnInit } from '@angular/core';
import {Cake} from "../../models/Cake";

@Component({
  selector: 'app-cakes',
  templateUrl: './cakes.component.html',
  styleUrls: ['./cakes.component.css']
})
export class CakesComponent implements OnInit {
  currentCake: Cake = {
    _id: '',
    url: '',
    baker:'',
  };

  isEdit: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
