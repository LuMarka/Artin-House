import { Component, ChangeDetectionStrategy, inject, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { HeaderComponent } from '../header/header.component';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { ApartmentsComponent } from '../apartments/apartments.component';
import { AmenitiesComponent } from '../amenities/amenities.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { BookingComponent } from '../booking/booking.component';
import { BookingPlatformsComponent } from '../booking-platforms/booking-platforms.component';
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
    BookingPlatformsComponent,
    FooterComponent,
    WhatsappButtonComponent
  ],
})
export class HomeComponent implements OnInit, AfterViewInit {
  private router = inject(Router);
  private translationService = inject(TranslationService);

  // Traducciones
  t = {
    viewArtinHouseI: this.translationService.translate('home.viewArtinHouseI'),
    viewArtinHouseII: this.translationService.translate('home.viewArtinHouseII')
  };

  ngOnInit() {
    // Verificar si hay preferencia de idioma guardada
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    if (preferredLanguage && ['en', 'pt'].includes(preferredLanguage)) {
      this.translationService.setLanguage(preferredLanguage as 'en' | 'pt' | 'es');
    }
  }

  ngAfterViewInit() {
    // Verificar si necesitamos hacer scroll a un apartamento específico
    setTimeout(() => {
      const scrollToApartment = localStorage.getItem('scrollToApartment');
      if (scrollToApartment) {
        const apartmentsSection = document.getElementById('apartments');
        if (apartmentsSection) {
          apartmentsSection.scrollIntoView({ behavior: 'smooth' });
        }
        // Limpiar el localStorage después del scroll
        localStorage.removeItem('scrollToApartment');
      }
    }, 500);
  }

  // Navegar a Artin House I
  goToArtinHouseI() {
    this.router.navigate(['/artin-house-i']);
  }

  // Navegar a Artin House II
  goToArtinHouseII() {
    this.router.navigate(['/artin-house-ii']);
  }
}