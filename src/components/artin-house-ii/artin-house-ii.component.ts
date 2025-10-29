import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
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
  private translationService = inject(TranslationService);
  
  // Translation helpers
  translate = (key: string) => this.translationService.translate(key);
  
  apartmentTitle = computed(() => this.translate('artinHouseII.title')());
  apartmentDescription = computed(() => this.translate('artinHouseII.description')());

  private artinHouseIIImages: Image[] = [
    { src: 'src/assets/apartments/artin-house-ii/dormitorio1.jpg', alt: 'Dormitorio principal', size: 'large' },
    { src: 'src/assets/apartments/artin-house-ii/cocina.jpg', alt: 'Cocina equipada', size: 'medium' },
    { src: 'src/assets/apartments/artin-house-ii/cocina1.jpg', alt: 'Área de cocina', size: 'small' },
    { src: 'src/assets/apartments/artin-house-ii/cocina2.jpg', alt: 'Cocina completa', size: 'small' },
    { src: 'src/assets/apartments/artin-house-ii/baño.jpg', alt: 'Baño principal', size: 'medium' },
    { src: 'src/assets/apartments/artin-house-ii/baño1.jpg', alt: 'Baño completo', size: 'small' }
  ];

 amenities = computed(() => [
    { icon: 'src/assets/apartments/iconos/wifi-router_3068649.png', name: this.translate('amenities.wifi')() },
    { icon: 'src/assets/apartments/iconos/smart-tv_2912080.png', name: this.translate('amenities.tv')() },
    { icon: 'src/assets/apartments/iconos/parking_659660.png', name: this.translate('amenities.parking')() },
    { icon: 'src/assets/apartments/iconos/store_4343738.png', name: this.translate('amenities.heating')() },
    { icon: 'src/assets/apartments/iconos/ventilator.png', name: this.translate('amenities.fan')() },
    { icon: 'src/assets/apartments/iconos/kitchen_2176529.png', name: this.translate('amenities.kitchen')() },
    { icon: 'src/assets/apartments/iconos/microondas.png', name: this.translate('amenities.microwave')() },
    { icon: 'src/assets/apartments/iconos/barbecue.png', name: this.translate('amenities.barbecue')() },    { icon: 'src/assets/apartments/iconos/parasol_10946249.png', name: this.translate('amenities.garden')() }
  ]);

  images = signal<Image[]>(this.artinHouseIIImages);
  
  // Computed para contar fotos restantes después de las primeras 5
  remainingPhotosCount = computed(() => {
    const total = this.images().length;
    return total > 5 ? total - 5 : 0;
  });
  
  isModalOpen = signal<boolean>(false);
  selectedImage = signal<Image | null>(null);
  selectedImageIndex = signal(0);
  currentMobileIndex = signal(0);
  currentModalIndex = signal(0);

  constructor(private router: Router) {}

  openModal(image: Image, index?: number): void {
    this.selectedImage.set(image);
    this.currentModalIndex.set(index ?? 0);
    this.isModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  // Selecciona imagen en la galería desktop
  selectImage(index: number): void {
    this.selectedImageIndex.set(index);
  }

  // Navegación móvil
  previousMobileImage(): void {
    const current = this.currentMobileIndex();
    if (current > 0) {
      this.currentMobileIndex.set(current - 1);
    }
  }

  nextMobileImage(): void {
    const current = this.currentMobileIndex();
    const total = this.images().length;
    if (current < total - 1) {
      this.currentMobileIndex.set(current + 1);
    }
  }

  goToMobileImage(index: number): void {
    this.currentMobileIndex.set(index);
  }

  // Navegación en modal
  previousModalImage(): void {
    const current = this.currentModalIndex();
    const total = this.images().length;
    const newIndex = current > 0 ? current - 1 : total - 1;
    this.currentModalIndex.set(newIndex);
    this.selectedImage.set(this.images()[newIndex]);
  }

  nextModalImage(): void {
    const current = this.currentModalIndex();
    const total = this.images().length;
    const newIndex = current < total - 1 ? current + 1 : 0;
    this.currentModalIndex.set(newIndex);
    this.selectedImage.set(this.images()[newIndex]);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedImage.set(null);
    document.body.style.overflow = 'auto';
  }

  setModalIndex(index: number): void {
    this.currentModalIndex.set(index);
    this.selectedImage.set(this.images()[index]);
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