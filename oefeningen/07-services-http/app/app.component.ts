import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from "angular2/http";
import {City} from './city.model'
import {CityService} from "./city.service";

// Component annotation. Let op de injection van providers: []
@Component({
	selector   : 'hello-world',
	templateUrl: 'app/app.html',
	providers  : [CityService, HTTP_PROVIDERS]
})

// Class met properties, array met cities
export class AppComponent{
	// Properties voor de component/class
	public  cities:City[];

	constructor(private cityService:CityService) {
		//...eventuele extra initialisaties
		// this.getCities(); <== Verplaatst naar ngOnInit() = nu best practice
		console.log('1. In de constructor');
	}
	ngOnInit(){
		console.log('3. In ngOnInit');
		this.getCities();
	}

	//***********************
	// implementation
	//***********************
	getCities() {
		if (!this.cities) {
			this.cityService.getCities()
				.subscribe(cityData => {
						this.cities = cityData.json();				// 1. success handler
					},
					err => console.log(err),						// 2. error handler
					()=> console.log('Getting cities complete...')	// 3. complete handler
				)
		}
	}
}