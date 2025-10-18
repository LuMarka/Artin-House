import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { WhatsappButtonComponent } from '../whatsapp-button/whatsapp-button.component';
import { BookingComponent } from '../booking/booking.component';
import { ContactComponent } from '../contact/contact.component';

interface Image {
  src: string;
  altKey: string;
}

interface ProcessedImage {
  src: string;
  alt: string;
  size: 'small' | 'medium' | 'large';
}

interface Amenity {
  icon: string;
  name: string;
}

@Component({
  selector: 'app-artin-house-i',
  standalone: true,
  templateUrl: './artin-house-i.component.html',
  styleUrls: ['./artin-house-i.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    WhatsappButtonComponent,
    BookingComponent
  ],
})
export class ArtinHouseIComponent {
  private router = inject(Router);
  private translationService = inject(TranslationService);
  
  // Estado del modal
  isModalOpen = signal(false);
  selectedImage = signal<ProcessedImage | null>(null);
  
  // Información del departamento
  apartmentTitle = 'Artin House I';
  apartmentDescription = 'Un apartamento amplio y luminoso, perfecto para familias o grupos pequeños. Cuenta con cocina totalmente equipada, comodidades modernas y acceso directo al jardín.';
  
  // Amenidades específicas
  amenities: Amenity[] = [
    { icon: '/assets/apartments/iconos/wifi-router_3068649.png', name: 'Wi-Fi Gratuito' },
    { icon: '/assets/apartments/iconos/parking_659660.png', name: 'Estacionamiento' },
    { icon: '/assets/apartments/iconos/air-conditioner_583398.png', name: 'Aire Acondicionado' },
    { icon: '/assets/apartments/iconos/kitchen_2176529.png', name: 'Cocina Equipada' },
    { icon: '/assets/apartments/iconos/smart-tv_2912080.png', name: 'Smart TV' },
    { icon: '/assets/apartments/iconos/parasol_10946249.png', name: 'Jardín Privado' }
  ];
  
  // Imágenes específicas de Artin House I
  private imageDefs: Image[] = [
    { src: 'src/assets/apartments/artin-house-i/dormitoriogrande5.jpg', altKey: 'gallery.alt.dormitorioPrincipal' },
    { src: 'src/assets/apartments/artin-house-i/cocina6.jpg', altKey: 'gallery.alt.kitchen' },
    { src: 'src/assets/apartments/artin-house-i/cocina3.jpg', altKey: 'gallery.alt.kitchen1' },
    { src: 'src/assets/apartments/artin-house-i/dormitoriochico.jpg', altKey: 'gallery.alt.bedroom' },
    { src: 'src/assets/apartments/artin-house-i/dormitorioGrande2.jpg', altKey: 'gallery.alt.bedroom' },
    { src: 'src/assets/apartments/artin-house-i/baño.jpg', altKey: 'gallery.alt.bathroom1' },
    { src: 'src/assets/apartments/artin-house-i/cocina1.jpg', altKey: 'gallery.alt.kitchen' },
    { src: 'src/assets/apartments/artin-house-i/cocina4.jpg', altKey: 'gallery.alt.kitchen' },
    { src: 'src/assets/apartments/artin-house-i/baño1.jpg', altKey: 'gallery.alt.bathroom' },
    { src: 'src/assets/apartments/artin-house-i/dormitoriochico1.jpg', altKey: 'gallery.alt.bedroom' },
    { src: 'src/assets/apartments/artin-house-i/cocina5.jpg', altKey: 'gallery.alt.kitchen' },
    { src: 'src/assets/apartments/artin-house-i/baño2.jpg', altKey: 'gallery.alt.bathroom' }
  ];

  images = computed(() => {
    return this.imageDefs.map((img, index) => ({
      src: img.src,
      alt: this.translationService.translate(img.altKey)(),
      size: this.getImageSize(index)
    }));
  });

  // Determina el tamaño de cada imagen basado en su índice
  private getImageSize(index: number): 'small' | 'medium' | 'large' {
    const sizePattern = ['large', 'medium', 'small', 'medium', 'small', 'small', 'medium', 'small', 'large', 'small', 'medium', 'small'];
    return sizePattern[index % sizePattern.length] as 'small' | 'medium' | 'large';
  }

  // Abre el modal con la imagen seleccionada
  openModal(image: ProcessedImage) {
    this.selectedImage.set(image);
    this.isModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  // Cierra el modal
  closeModal() {
    this.isModalOpen.set(false);
    this.selectedImage.set(null);
    document.body.style.overflow = 'auto';
  }

  // Maneja el click en el backdrop del modal
  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  // Navegar al inicio
  goToHome() {
    this.router.navigate(['/']);
  }

  // Navegar a contacto
  goToContact() {
    this.router.navigate(['/contact']);
  }
}