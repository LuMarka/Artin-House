
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ApartmentsComponent } from './components/apartments/apartments.component';
import { AmenitiesComponent } from './components/amenities/amenities.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { BookingComponent } from './components/booking/booking.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    HeroComponent,
    ApartmentsComponent,
    AmenitiesComponent,
    GalleryComponent,
    BookingComponent,
    FooterComponent
  ],
})
export class AppComponent {}
