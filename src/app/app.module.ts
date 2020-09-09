import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './app.home';
import { ImageComponent } from './app.image';
import { AboutComponent } from './app.about';
import { routing } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ImageComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
