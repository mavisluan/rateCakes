import { Injectable } from '@angular/core';
import {Rating} from "../models/Rating";

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";

// set header for post request
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class RatingService {
  // API call url
  apiUrl: string = '/api/ratings';
  // inject HttpClient
  constructor(private http: HttpClient) { }
  // getRatings(): Observable<Rating[]> {
  //   return this.http.get<Rating[]>(this.apiUrl);
  // }
  // // API call -- post request
  // addRating(rating: Rating): Observable<Rating> {
  //   return this.http.post<Rating>(this.apiUrl, rating, httpOptions);
  // }
  //
  // updateRating(targetRating: Rating): Observable<Rating> {
  //   const url = `${this.apiUrl}/${targetRating._id}`;
  //   return this.http.patch<Rating>(url, targetRating, httpOptions);
  // }
  //
  // removeRating(id: string): Observable<Rating> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.delete<Rating>(url, httpOptions);
  // }
  //
  // getRating(id: string): Observable<Rating> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.get<Rating>(url);
  // }
}
