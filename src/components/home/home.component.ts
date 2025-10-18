import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { ApartmentsComponent } from '../apartments/apartments.component';
import { AmenitiesComponent } from '../amenities/amenities.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { BookingComponent } from '../booking/booking.component';
import { FooterComponent } from '../footer/footer.component';
import { WhatsappButtonComponent } from '../whatsapp-button/whatsapp-button.component';
import { ReviewsComponent } from '../reviews/reviews.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
     CommonModule,
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ApartmentsComponent,
    AmenitiesComponent,
    GalleryComponent,
    ReviewsComponent,
    BookingComponent,
    FooterComponent,
    WhatsappButtonComponent
  ],
})
export class HomeComponent {}