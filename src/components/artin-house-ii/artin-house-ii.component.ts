import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BookingComponent } from '../booking/booking.component';
import { WhatsappButtonComponent } from '../whatsapp-button/whatsapp-button.component';

interface Image {
  src: string;
  alt: string;
  size: 'small' | 'medium' | 'large';
}

interface Amenity {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-artin-house-ii',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, BookingComponent, WhatsappButtonComponent],
  templateUrl: './artin-house-ii.component.html',
  styleUrls: ['./artin-house-ii.component.css']
})
export class ArtinHouseIIComponent {
  apartmentTitle = 'Artin House II';
  apartmentDescription = 'Moderno apartamento con todas las comodidades para una estancia perfecta. Ideal para familias y grupos pequeños que buscan confort y elegancia en el centro de la ciudad.';

  private artinHouseIIImages: Image[] = [
    { src: '/assets/apartments/artin-house-ii/dormitorio1.jpg', alt: 'Dormitorio principal', size: 'large' },
    { src: '/assets/apartments/artin-house-ii/cocina.jpg', alt: 'Cocina equipada', size: 'medium' },
    { src: '/assets/apartments/artin-house-ii/cocina1.jpg', alt: 'Área de cocina', size: 'small' },
    { src: '/assets/apartments/artin-house-ii/cocina2.jpg', alt: 'Cocina completa', size: 'small' },
    { src: '/assets/apartments/artin-house-ii/baño.jpg', alt: 'Baño principal', size: 'medium' },
    { src: '/assets/apartments/artin-house-ii/baño1.jpg', alt: 'Baño completo', size: 'small' }
  ];

  amenities: Amenity[] = [
    { name: 'WiFi Gratuito', icon: 'src/assets/apartments/iconos/wifi-router_3068649.png' },
    { name: 'Aire Acondicionado', icon: 'src/assets/apartments/iconos/aire-acondicionado.png' },
    { name: 'Cocina Equipada', icon: '/assets/apartments/iconos/cocina.png' },
    { name: 'TV Smart', icon: 'src/assets/apartments/iconos/tv.png' },
    { name: 'Refrigerador', icon: 'src/assets/apartments/iconos/refrigerador.png' },
    { name: 'Microondas', icon: 'src/assets/apartments/iconos/microondas.png' },
  /*   { name: 'Cafetera', icon: '/assets/apartments/iconos/cafetera.png' }, */
   /*  { name: 'Balcón', icon: '/assets/apartments/iconos/balcon.png' }, */
    { name: 'Estacionamiento', icon: 'src/assets/apartments/iconos/estacionamiento.png' },
   /*  { name: 'Seguridad 24/7', icon: '/assets/apartments/iconos/seguridad.png' },
    { name: 'Lavadora', icon: '/assets/apartments/iconos/lavadora.png' },
    { name: 'Plancha', icon: '/assets/apartments/iconos/plancha.png' } */
  ];

  images = signal<Image[]>(this.artinHouseIIImages);
  isModalOpen = signal<boolean>(false);
  selectedImage = signal<Image | null>(null);

  constructor(private router: Router) {}

  openModal(image: Image): void {
    this.selectedImage.set(image);
    this.isModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedImage.set(null);
    document.body.style.overflow = 'auto';
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  goToContact(): void {
    this.router.navigate(['/contact']);
  }
}