import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
                <body>
                    <nav>
                        <a routerLink="/home-page" routerLinkActive="active">HOME</a>
                        <a routerLink="/about-page" routerLinkActive="active">ABOUT</a>
                    </nav>
                    <br />
                    <router-outlet></router-outlet>
                </body>
              `,
    styleUrls: [ './app.component.css']
})

export class AppComponent { }
