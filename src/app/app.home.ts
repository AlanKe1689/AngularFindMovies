import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    template: `
                <div>
                    <select [(ngModel)]="selectedGenre" name="selectedGenre" (change)="changeGenre(selectedGenre)">
                        <option *ngFor="let genre of _genreArray" value="{{genre.id}}">{{genre.name}}</option>
                    </select>
                    <button  type="submit" (click)="goToPreviousPage(selectedGenre)">-</button>
                    <span>{{currentPage}}/{{totalPages}}</span>
                    <button type="submit" (click)="goToNextPage(selectedGenre)">+</button>
                </div>
                <div>
                    <ul>
                        <li *ngFor="let movie of _movieArray">
                            <h3>{{movie.title}}</h3>
                            <display-image [movieImagePath]="movie.poster_path"></display-image>
                            <p>{{movie.overview}}</p>
                        </li>
                    </ul>
                </div>
              `,
    styleUrls: [ './app.component.css']
})

export class HomeComponent {
    _movieArray: Array<any>;
    _genreArray: Array<any>;
    _http:HttpClient;

    public totalPages: number;

    public currentPage = 1;
    public selectedGenre = 28; // Default starting genre is the first one in the drop down menu

    API_KEY = '05b3f8b8536e7247d41e183c7f0d3ff8';

    BASE_URL  = 'http://api.themoviedb.org/3/discover/movie?api_key='
                + this.API_KEY

                + '&primary_release_date.gte=' + this.getStartDate()
                + '&primary_release_date.lte=' + this.getEndDate()
                + '&page=' + this.currentPage + '&with_genres=' + this.selectedGenre;

    GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key='
                + this.API_KEY
                + '&language=en-US';

    // Since we are using a provider above we can receive 
    // an instance through an instructor.
    constructor(private http: HttpClient) {
        this._http = http;
    }

    ngOnInit() {
        this.getMovies();
        this.getGenres();
    }

    getStartDate() {
        let startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        return this.getFormattedDate(startDate);
    }

    getEndDate() {
        let endDate = new Date();
        return this.getFormattedDate(endDate);
    }

    getFormattedDate(dt:Date) {
        let day = "";
        let month = "";
        let year = dt.getFullYear().toString();

        if((Number(dt.getMonth()) + 1) < 10) {
            month = "0" + (Number(dt.getMonth()) + 1).toString();
        } else {
            month = (Number(dt.getMonth()) + 1).toString();
        }

        if(dt.getDate() < 10) {
            day = "0" + dt.getDate().toString();
        } else {
            day = dt.getDate().toString();
        }
        
        return year + "-" + month + "-" + day;
    }

    changeGenre(selectedGenre) {
        this.currentPage = 1;

        this.BASE_URL  = 'http://api.themoviedb.org/3/discover/movie?api_key='
                        + this.API_KEY

                        + '&primary_release_date.gte=' + this.getStartDate()
                        + '&primary_release_date.lte=' + this.getEndDate()
                        + '&page=' + this.currentPage + '&with_genres=' + selectedGenre;

        this.getMovies();
    }

    goToPreviousPage(selectedGenre) {
        if(this.currentPage > 1) {
            this.BASE_URL  = 'http://api.themoviedb.org/3/discover/movie?api_key='
                        + this.API_KEY

                        + '&primary_release_date.gte=' + this.getStartDate()
                        + '&primary_release_date.lte=' + this.getEndDate()
                        + '&page=' + --this.currentPage + '&with_genres=' + selectedGenre;

            this.getMovies();
        }
    }

    goToNextPage(selectedGenre) {
        if(this.currentPage < this.totalPages) {
            this.BASE_URL  = 'http://api.themoviedb.org/3/discover/movie?api_key='
                        + this.API_KEY

                        + '&primary_release_date.gte=' + this.getStartDate()
                        + '&primary_release_date.lte=' + this.getEndDate()
                        + '&page=' + ++this.currentPage + '&with_genres=' + selectedGenre;

            this.getMovies();
        }
    }

    getMovies() {
        this._http.get<any>(this.BASE_URL)
            // Get data and wait for result.
            .subscribe(data => {
                this.currentPage = data.page;
                this.totalPages = data.total_pages;
                this._movieArray  = data.results;
            }, 
            error =>{
                // Let user know about the error.
                alert(error);
                console.error(error)
            })
    }

    getGenres() {
        this._http.get<any>(this.GENRE_URL)
        // Get data and wait for result.
        .subscribe(data => {
            this._genreArray = data.genres;
        }, 

        error =>{
            // Let user know about the error.
            alert(error);
            console.error(error)
        })
    }
}
