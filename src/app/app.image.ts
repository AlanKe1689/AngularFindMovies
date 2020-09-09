import { Component, Input } from '@angular/core';

@Component({
    selector: 'display-image',
    template: `
                <div *ngIf="movieImagePath !== null && movieImagePath.length > 0">
                    <img src="http://image.tmdb.org/t/p/w185{{movieImagePath}}"/>
                </div>
              `,
    styleUrls: [ './app.component.css']
})

export class ImageComponent {
    @Input()
    movieImagePath: string;
}
