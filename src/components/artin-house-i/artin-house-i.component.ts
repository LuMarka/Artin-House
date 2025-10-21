import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { WhatsappButtonComponent } from '../whatsapp-button/whatsapp-button.component';
import { BookingComponent } from '../booking/booking.component';

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
  
  // Estado del modal y galería
  isModalOpen = signal(false);
  selectedImage = signal<ProcessedImage | null>(null);
  selectedImageIndex = signal(0);
  currentMobileIndex = signal(0);
  currentModalIndex = signal(0);
  
  // Translation helpers
  translate = (key: string) => this.translationService.translate(key);
  
  // Información del departamento
  apartmentTitle = computed(() => this.translate('artinHouseI.title')());
  apartmentDescription = computed(() => this.translate('artinHouseI.description')());
  
  // Amenidades específicas
  amenities = computed(() => [
    { icon: 'src/assets/apartments/iconos/wifi-router_3068649.png', name: this.translate('amenities.wifi')() },
    { icon: 'src/assets/apartments/iconos/parking_659660.png', name: this.translate('amenities.parking')() },
    { icon: 'src/assets/apartments/iconos/ventilator.png', name: this.translate('amenities.fan')() },
    { icon: 'src/assets/apartments/iconos/kitchen_2176529.png', name: this.translate('amenities.kitchen')() },
    { icon: 'src/assets/apartments/iconos/smart-tv_2912080.png', name: this.translate('amenities.tv')() },
    { icon: 'src/assets/apartments/iconos/parasol_10946249.png', name: this.translate('amenities.garden')() },
    { icon: 'src/assets/apartments/iconos/store_4343738.png', name: this.translate('amenities.heating')() }
  ]);
  
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

  // Computed para contar fotos restantes después de las primeras 5
  remainingPhotosCount = computed(() => {
    const total = this.images().length;
    return total > 5 ? total - 5 : 0;
  });

  // Determina el tamaño de cada imagen basado en su índice
  private getImageSize(index: number): 'small' | 'medium' | 'large' {
    const sizePattern = ['large', 'medium', 'small', 'medium', 'small', 'small', 'medium', 'small', 'large', 'small', 'medium', 'small'];
    return sizePattern[index % sizePattern.length] as 'small' | 'medium' | 'large';
  }

  // Abre el modal con la imagen seleccionada
  openModal(image: ProcessedImage, index?: number) {
    this.selectedImage.set(image);
    this.currentModalIndex.set(index ?? 0);
    this.isModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  // Selecciona imagen en la galería desktop
  selectImage(index: number) {
    this.selectedImageIndex.set(index);
  }

  // Navegación móvil
  previousMobileImage() {
    const current = this.currentMobileIndex();
    if (current > 0) {
      this.currentMobileIndex.set(current - 1);
    }
  }

  nextMobileImage() {
    const current = this.currentMobileIndex();
    const total = this.images().length;
    if (current < total - 1) {
      this.currentMobileIndex.set(current + 1);
    }
  }

  goToMobileImage(index: number) {
    this.currentMobileIndex.set(index);
  }

  // Navegación en modal
  previousModalImage() {
    const current = this.currentModalIndex();
    const total = this.images().length;
    const newIndex = current > 0 ? current - 1 : total - 1;
    this.currentModalIndex.set(newIndex);
    this.selectedImage.set(this.images()[newIndex]);
  }

  nextModalImage() {
    const current = this.currentModalIndex();
    const total = this.images().length;
    const newIndex = current < total - 1 ? current + 1 : 0;
    this.currentModalIndex.set(newIndex);
    this.selectedImage.set(this.images()[newIndex]);
  }

  // Cierra el modal
  closeModal() {
    this.isModalOpen.set(false);
    this.selectedImage.set(null);
    document.body.style.overflow = 'auto';
  }

  // Cambia el índice de la imagen en el modal sin cerrarlo
  setModalIndex(index: number) {
    this.currentModalIndex.set(index);
    this.selectedImage.set(this.images()[index]);
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