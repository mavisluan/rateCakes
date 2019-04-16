import { Injectable } from '@angular/core';
import {Cake} from "../models/Cake";

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {Rating} from "../models/Rating";

// set header for post request
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class CakeService {
  // API call url
  apiUrl: string = '/api/cakes';
  // inject HttpClient
  constructor(private http: HttpClient) { }
  // HttpClient return Observable
  // API call--get request
  getCakes(): Observable<Cake[]> {
    return this.http.get<Cake[]>(this.apiUrl);
  }
  // API call -- post request
  addCake(cake: Cake): Observable<Cake> {
    return this.http.post<Cake>(this.apiUrl, cake, httpOptions);
  }

  updateCake(targetCake: Cake): Observable<Cake> {
    const url = `${this.apiUrl}/${targetCake._id}`;
    return this.http.patch<Cake>(url, targetCake, httpOptions);
  }

  removeCake(id: string): Observable<Cake> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Cake>(url, httpOptions);
  }

  getCake(id: string): Observable<Cake> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cake>(url);
  }

  addRatingToCake(cakeId, rating: Rating): Observable<Cake> {
    // console.log('addrating', rating);
    const url = `${this.apiUrl}/${cakeId}/ratings`;
    return this.http.patch<Cake>(url, rating, httpOptions);
  }
}
