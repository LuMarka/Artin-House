import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class ApartmentsComponent {
  private translationService = inject(TranslationService);
  private router = inject(Router);

  title = this.translationService.translate('apartments.title');
  subtitle = this.translationService.translate('apartments.subtitle');
  
  artin1 = {
    title: this.translationService.translate('apartments.artin1.title'),
    desc: this.translationService.translate('apartments.artin1.desc'),
    guests: this.translationService.translate('apartments.artin1.guests'),
    rooms: this.translationService.translate('apartments.artin1.rooms'),
  }

  artin2 = {
    title: this.translationService.translate('apartments.artin2.title'),
    desc: this.translationService.translate('apartments.artin2.desc'),
    guests: this.translationService.translate('apartments.artin2.guests'),
    rooms: this.translationService.translate('apartments.artin2.rooms'),
  }

  navigateToApartment(apartmentId: string) {
    // Navegar usando Angular Router
    this.router.navigate([`/${apartmentId}`]);
  }
}