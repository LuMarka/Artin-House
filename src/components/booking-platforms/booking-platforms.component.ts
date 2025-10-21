import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-booking-platforms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-platforms.component.html',
  styleUrl: './booking-platforms.component.css'
})
export class BookingPlatformsComponent {
  t: any;

  constructor(private translationService: TranslationService) {
    this.t = {
      title: this.translationService.translate('bookingPlatforms.title'),
      subtitle: this.translationService.translate('bookingPlatforms.subtitle'),
    };
  }

  platforms = [
    {
      name: 'Booking.com',
      logo: 'src/assets/logos/booking-com.svg',
      /*url: 'https://www.booking.com',*/
      alt: 'Booking.com'
    },
    {
      name: 'AlquilerArgentina',
      logo: 'src/assets/logos/logo-aa_h.svg', 
     /* url: 'https://www.alquilerargentina.com/alojamientos/h82x-Casa-Artin-house-Lujan-De-Cuyo.html',*/
      alt: 'AlquilerArgentina.com'
    },
    {
      name: 'Airbnb',
      logo: 'src/assets/logos/airbnb-ar21.svg',
      /*url: 'https://www.airbnb.com',*/
      alt: 'Airbnb'
    }
  ];
}