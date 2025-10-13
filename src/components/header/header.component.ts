import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private translationService = inject(TranslationService);
  isMenuOpen = signal(false);

  language = this.translationService.language;
  nav = {
    apartments: this.translationService.translate('nav.apartments'),
    amenities: this.translationService.translate('nav.amenities'),
    gallery: this.translationService.translate('nav.gallery'),
    bookNow: this.translationService.translate('nav.bookNow'),
  }

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }
  
  setLanguage(lang: 'en' | 'es') {
    this.translationService.setLanguage(lang);
  }

  scrollTo(elementId: string): void {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
    this.isMenuOpen.set(false);
  }
}