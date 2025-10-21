import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

interface Image {
  src: string;
  altKey: string;
}

interface ProcessedImage {
  src: string;
  alt: string;
  size: 'small' | 'medium' | 'large';
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class GalleryComponent {
  private translationService = inject(TranslationService);
  
  title = this.translationService.translate('gallery.title');
  
  // Estado del modal
  isModalOpen = signal(false);
  selectedImage = signal<ProcessedImage | null>(null);
  
  private imageDefs: Image[] = [
    { src: 'src/assets/apartments/complejo/imagen-complejo-exterior.jpg', altKey: 'gallery.alt.exterior' },
    { src: 'src/assets/apartments/artin-house-i/cocina6.jpg', altKey: 'gallery.alt.kitchen' },
    { src: 'src/assets/apartments/artin-house-i/cocina3.jpg', altKey: 'gallery.alt.kitchen1' },
    { src: 'src/assets/apartments/artin-house-i/dormitoriogrande5.jpg', altKey: 'gallery.alt.dormitorioPrincipal' },
    { src: 'src/assets/apartments/artin-house-i/dormitoriochico.jpg', altKey: 'gallery.alt.bedroom' },
    { src: 'src/assets/apartments/artin-house-ii/cocina.jpg', altKey: 'gallery.alt.kitchen' },
    { src: 'src/assets/apartments/artin-house-i/dormitorioGrande2.jpg', altKey: 'gallery.alt.bedroom' },
    { src: 'src/assets/apartments/artin-house-ii/dormitorio1.jpg', altKey: 'gallery.alt.dormitorio' },
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
    // Patrón de tamaños: más pequeñas y medianas, pocas grandes
    const sizePattern = ['medium', 'large', 'small', 'large', 'small', 'small', 'medium', 'medium'];
    return sizePattern[index % sizePattern.length] as 'small' | 'medium' | 'large';
  }

  // Abre el modal con la imagen seleccionada
  openModal(image: ProcessedImage) {
    this.selectedImage.set(image);
    this.isModalOpen.set(true);
    document.body.style.overflow = 'hidden'; // Previene scroll del body
  }

  // Cierra el modal
  closeModal() {
    this.isModalOpen.set(false);
    this.selectedImage.set(null);
    document.body.style.overflow = 'auto'; // Restaura scroll del body
  }

  // Maneja el click en el backdrop del modal
  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}