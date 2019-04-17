import {Component, Input, OnInit} from '@angular/core';
import {Cake} from "../../models/Cake";
import {CakeService} from "../../services/cake.service";

@Component({
  selector: 'app-cake-info',
  templateUrl: './cake-info.component.html',
  styleUrls: ['./cake-info.component.css']
})
export class CakeInfoComponent implements OnInit {
  @Input() cake: Cake;
  constructor(private cakeService: CakeService) { }

  ngOnInit() {
  }

  onDeleteRate(cakeId, ratingId) {
    this.cakeService.removeRatingFromCake(cakeId, ratingId).subscribe(cake => {
      console.log(`DELETING RATE`, cake);
      this.cakeService.getCake(cakeId).subscribe(cake => this.cake = cake)
    })
  }

}
