// app.component.ts
import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from "angular2/http";
import {City} from './city.model'
import {CityService} from "./city.service";
import {RouterLink} from 'angular2/router'
import {Http} from "angular2/http";

@Component({
	selector   : 'city-app',
	templateUrl: 'app/app.html',
	providers  : [],
	directives : [RouterLink]
})

// Class met properties, array met cities
export class AppComponent {
	// Properties voor de component/class
	public cities:City[];
	public currentCity:City;

	constructor(private cityService:CityService) {
		//...eventuele extra initialisaties
		this.getCities();
	}

	// Not used in this example
	getCity(city) {
		this.currentCity = city;
	}

	// Not used in this example
	clearCity() {
		this.currentCity = null;
	}

	// Not used in this example
	updateRating(rating) {
		this.currentCity.rating += rating;
	}

	//***********************
	// implementation
	//***********************
	getCities() {
		if (!this.cityService.cache) {
			this.cityService.getCities()
				.subscribe(cityData => {
						this.cities            = cityData.json();				// 1. success handler
						this.cityService.cache = this.cities;			// caching van cities
					},
					err => console.log(err),						// 2. error handler
					()=> console.log('Getting cities complete...')	// 3. complete handler
				)
		} else {
			this.cities = this.cityService.cache;
		}
	}
}