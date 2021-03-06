import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from "angular2/http";
import {MovieService} from "./movie.service";
import  'rxjs/Rx';
import {MovieModel} from "./movie.model";

// Component annotation. Let op de injection van providers: []
@Component({
	selector   : 'movie-app',
	templateUrl: 'app/app.html',
	providers  : [MovieService, HTTP_PROVIDERS],
	styles     : [`.moviePoster {max-height:200px}`]
})

// Class met properties, array met cities
export class AppComponent {
	// Properties voor de component/class
	public movies:MovieModel[];

	constructor(private movieService:MovieService) {
		//...eventuele extra initialisaties
	}

	searchMovies(keyword) {
		this.movieService.searchMovies(keyword)
			.subscribe((movieData:MovieModel[]) => {
					this.movies = movieData;				// 1. success handler, nu gemapt op specifiek client-sided Model
				},
				err => console.log(err),						// 2. error handler
				()=> console.log('Getting movies complete...')	// 3. complete handler
			)
	}
}