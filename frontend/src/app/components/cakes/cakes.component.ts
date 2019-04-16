import {Component, OnInit, ViewChild} from '@angular/core';
import {Cake} from "../../models/Cake";
import {CakeService} from "../../services/cake.service";
import {Rating} from "../../models/Rating";

@Component({
  selector: 'app-cakes',
  templateUrl: './cakes.component.html',
  styleUrls: ['./cakes.component.css']
})
export class CakesComponent implements OnInit {
  newCake: Cake = {
    _id: '',
    url: '',
    baker:'',
    ratings:[]
  };

  currentCake: Cake;

  isEdit: boolean = false;

  @ViewChild('cakeForm') form: any;

  cakes: Cake[];
  /* inject CakeService as dependency*/
  constructor(private cakeService: CakeService) { }

  ngOnInit() {
    this.getAllCakes();
  }

  onNewCake({value, valid}: { value: Cake, valid: boolean }) {
    // if form input is not valid, console the error
    if (!valid) {
      console.log('Form is not valid');
    } else {
      this.cakeService.addCake(value as Cake).subscribe( cake => {
        console.log('cake',cake);
        this.cakes.unshift(cake);
      });
      // reset the form
      this.form.reset();
    }
  }

  onUpdatedCake({value, valid}: { value: Cake, valid: boolean }) {
    this.cakes.forEach((cur, index) => {
      if (value._id === cur._id) {
        this.cakes.splice(index, 1);
        this.cakes.unshift(value);
      }
    })
    this.cakeService.updateCake(value as Cake).subscribe( cake => {
      console.log(cake);
    });
    // reset the form
    this.form.reset();
    this.isEdit = false;
  }

  getAllCakes() {
    this.cakeService.getCakes().subscribe(cakes => {
      this.cakes = cakes.map(cake => {
        return cake;
      });
      console.log('getAllCakes', cakes);
    })
  }

  removeCake(id: string) {
    if (confirm('Are You Sure?')) {
      this.cakeService.removeCake(id).subscribe(() => {
        this.cakes = this.cakes.filter(cake => cake._id != id);
      });
    }
  }

  editCake(id: string) {
    this.cakeService.getCake(id).subscribe(cake => { this.newCake = cake });
    this.isEdit = true;
  }

  onNewRate(cakeId, stars, comment) {
    var rating = {stars: stars.value, comment: comment.value};

    this.cakeService.addRatingToCake(cakeId, rating).subscribe(cake => {
      if (this.currentCake && this.currentCake._id === cakeId) {
        this.currentCake.ratings.unshift(rating);
        this.currentCake.avgRating = cake.avgRating;
      }
    });

    stars.value = 5;
    comment.value = '';
  }

  onDeleteRate(cakeId, ratingId) {
    this.cakeService.removeRatingFromCake(cakeId, ratingId).subscribe(cake => {
      if (this.currentCake && this.currentCake._id === cakeId) {
        // this.currentCake.ratings = this.currentCake.ratings.filter(rating => rating._id !== ratingId);
        this.currentCake.ratings = cake.ratings;
        this.currentCake.avgRating = cake.avgRating;
      }
    })
  }

  showOne(cake: Cake) {
    this.currentCake = cake;
    console.log(cake);
  }
}

