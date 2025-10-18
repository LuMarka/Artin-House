import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private translationService = inject(TranslationService);
  private router = inject(Router);
  isMenuOpen = signal(false);

  language = this.translationService.language;
  nav = {
    about: this.translationService.translate('nav.about'),
    apartments: this.translationService.translate('nav.apartments'),
    artinHouseI: this.translationService.translate('nav.artinHouseI'),
    artinHouseII: this.translationService.translate('nav.artinHouseII'),
    amenities: this.translationService.translate('nav.amenities'),
    gallery: this.translationService.translate('nav.gallery'),
    contact: this.translationService.translate('nav.contact'),
    bookNow: this.translationService.translate('nav.bookNow'),
  }

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }
  
  setLanguage(lang: 'en' | 'es') {
    this.translationService.setLanguage(lang);
  }

  scrollTo(elementId: string): void {
    // Si estamos en la página principal, solo hacer scroll
    if (this.router.url === '/') {
      document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Si estamos en otra página, navegar a home y luego hacer scroll
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      });
    }
    this.isMenuOpen.set(false);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
    this.isMenuOpen.set(false);
  }

  navigateToContact(): void {
    this.router.navigate(['/contact']);
    this.isMenuOpen.set(false);
  }

  navigateToApartment(apartmentPath: string): void {
    this.router.navigate([apartmentPath]);
    this.isMenuOpen.set(false);
  }
}