import { Component, ChangeDetectionStrategy, inject, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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
     RouterModule,
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

  // Surroundings accordion state
  surroundingsAccordion = {
    plazas: false,
    restaurants: false,
    attractions: false,
    transport: false
  };

  // Traducciones
  t = {
    viewArtinHouseI: this.translationService.translate('home.viewArtinHouseI'),
    viewArtinHouseII: this.translationService.translate('home.viewArtinHouseII'),
    // Surroundings translations
    surroundingsTitle: this.translationService.translate('surroundings.title'),
    surroundingsSubtitle: this.translationService.translate('surroundings.subtitle'),
    plazasTitle: this.translationService.translate('surroundings.plazas.title'),
    restaurantsTitle: this.translationService.translate('surroundings.restaurants.title'),
    attractionsTitle: this.translationService.translate('surroundings.attractions.title'),
    transportTitle: this.translationService.translate('surroundings.transport.title')
  };

  // Datos de los alrededores
  surroundingsData = {
    plazas: [
      { name: this.translationService.translate('surroundings.plazas.sabat'), distance: '150 m' },
      { name: this.translationService.translate('surroundings.plazas.lujan'), distance: '450 m' },
      { name: this.translationService.translate('surroundings.plazas.mosconi'), distance: '900 m' },
      { name: this.translationService.translate('surroundings.plazas.francia'), distance: '4,8 km' },
      { name: this.translationService.translate('surroundings.plazas.integracion'), distance: '10 km' },
      { name: this.translationService.translate('surroundings.plazas.sarmiento'), distance: '13 km' },
      { name: this.translationService.translate('surroundings.plazas.perla'), distance: '13 km' },
      { name: this.translationService.translate('surroundings.plazas.leones'), distance: '14 km' },
      { name: this.translationService.translate('surroundings.plazas.coquimbito'), distance: '16 km' },
      { name: this.translationService.translate('surroundings.plazas.ferroviario'), distance: '16 km' }
    ],
    restaurants: [
      { name: this.translationService.translate('surroundings.restaurants.tripancho'), distance: '200 m' },
      { name: this.translationService.translate('surroundings.restaurants.havanna'), distance: '350 m' },
      { name: this.translationService.translate('surroundings.restaurants.liliana'), distance: '400 m' }
    ],
    attractions: [
      { name: this.translationService.translate('surroundings.attractions.museo'), distance: '19 km' },
      { name: this.translationService.translate('surroundings.attractions.civico'), distance: '19 km' }
    ],
    transport: [
      { name: this.translationService.translate('surroundings.transport.terminal'), distance: '19 km' },
      { name: this.translationService.translate('surroundings.transport.airport'), distance: '25 km' }
    ]
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

  // Toggle accordion for surroundings
  toggleSurroundingsAccordion(category: keyof typeof this.surroundingsAccordion) {
    this.surroundingsAccordion[category] = !this.surroundingsAccordion[category];
  }

  // Mendoza Guide CTA methods
  getMendozaGuideTitle(): string {
    const translation = this.translationService.translate('home.mendozaGuide.title')();
    return translation !== 'home.mendozaGuide.title' ? translation : '¡Qué hacer en Mendoza!';
  }

  getMendozaGuideDescription(): string {
    const translation = this.translationService.translate('home.mendozaGuide.description')();
    return translation !== 'home.mendozaGuide.description' ? translation : 'Descubrí los mejores lugares, experiencias gastronómicas y aventuras que Mendoza tiene para ofrecerte';
  }

  getMendozaGuideButtonText(): string {
    const translation = this.translationService.translate('home.mendozaGuide.button')();
    return translation !== 'home.mendozaGuide.button' ? translation : 'Explorar Mendoza';
  }
}