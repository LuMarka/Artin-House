import { Component, OnInit, inject, Input } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { TranslationService } from '../../services/translation.service';

interface ApartmentImage {
  src: string;
  alt: string;
  description: string;
}

interface ApartmentDetails {
  id: string;
  title: string;
  description: string;
  amenities: string[];
  images: ApartmentImage[];
  specs: {
    guests: string;
    rooms: string;
    bathrooms: string;
    size: string;
  };
}

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.css'],
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, FooterComponent]
})
export class ApartmentDetailComponent implements OnInit {
  @Input() apartmentId!: string;
  private translationService = inject(TranslationService);
  
  apartment: ApartmentDetails | null = null;
  selectedImageIndex = 0;

  private apartmentsData: { [key: string]: ApartmentDetails } = {
    'artin-house-i': {
      id: 'artin-house-i',
      title: 'Artin House I',
      description: 'Un elegante departamento de 2 dormitorios con vista al jardín, perfectamente equipado para una estadía confortable. Cuenta con cocina completa, living amplio y terraza privada.',
      amenities: [
        'WiFi gratuito',
        'Aire acondicionado',
        'Calefacción',
        'Cocina completa',
        'TV por cable',
        'Estacionamiento',
        'Zona de parrilla',
        'Jardín'
      ],
      images: [
        {
          src: 'assets/apartments/artin-house-i/dormitorioGrande.jpg',
          alt: 'Dormitorio principal Artin House I',
          description: 'Amplio dormitorio principal con cama king'
        },
        {
          src: 'assets/apartments/artin-house-i/cocina.jpg',
          alt: 'Cocina Artin House I',
          description: 'Cocina completamente equipada'
        },
        {
          src: 'assets/apartments/artin-house-i/cocina1.jpg',
          alt: 'Vista cocina Artin House I',
          description: 'Vista completa de la cocina'
        },
        {
          src: 'assets/apartments/artin-house-i/baño.jpg',
          alt: 'Baño Artin House I',
          description: 'Baño completo con ducha'
        },
        {
          src: 'assets/apartments/artin-house-i/dormitoriochico.jpg',
          alt: 'Segundo dormitorio Artin House I',
          description: 'Segundo dormitorio acogedor'
        },
        {
          src: 'assets/apartments/artin-house-i/cocina3.jpg',
          alt: 'Cocina detalle Artin House I',
          description: 'Detalles de la cocina equipada'
        }
      ],
      specs: {
        guests: 'Hasta 4 huéspedes',
        rooms: '2 dormitorios',
        bathrooms: '1 baño completo',
        size: '65 m²'
      }
    },
    'artin-house-ii': {
      id: 'artin-house-ii',
      title: 'Artin House II',
      description: 'Acogedor departamento de 1 dormitorio ideal para parejas o viajeros individuales. Diseño moderno con todas las comodidades necesarias para una estadía perfecta.',
      amenities: [
        'WiFi gratuito',
        'Aire acondicionado',
        'Calefacción',
        'Cocina completa',
        'TV por cable',
        'Estacionamiento',
        'Zona de parrilla',
        'Jardín'
      ],
      images: [
        {
          src: 'assets/apartments/artin-house-ii/dormitorio1.jpg',
          alt: 'Dormitorio Artin House II',
          description: 'Dormitorio principal acogedor'
        },
        {
          src: 'assets/apartments/artin-house-ii/cocina.jpg',
          alt: 'Cocina Artin House II',
          description: 'Cocina completamente equipada'
        },
        {
          src: 'assets/apartments/artin-house-ii/cocina1.jpg',
          alt: 'Vista cocina Artin House II',
          description: 'Vista completa de la cocina'
        },
        {
          src: 'assets/apartments/artin-house-ii/cocina2.jpg',
          alt: 'Cocina detalle Artin House II',
          description: 'Detalles de la cocina moderna'
        },
        {
          src: 'assets/apartments/artin-house-ii/baño.jpg',
          alt: 'Baño Artin House II',
          description: 'Baño completo con ducha'
        },
        {
          src: 'assets/apartments/artin-house-ii/baño1.jpg',
          alt: 'Baño vista Artin House II',
          description: 'Vista completa del baño'
        }
      ],
      specs: {
        guests: 'Hasta 2 huéspedes',
        rooms: '1 dormitorio',
        bathrooms: '1 baño completo',
        size: '45 m²'
      }
    }
  };

  ngOnInit() {
    if (this.apartmentId && this.apartmentsData[this.apartmentId]) {
      this.apartment = this.apartmentsData[this.apartmentId];
    }
  }

  selectImage(index: number) {
    this.selectedImageIndex = index;
  }

  goToBooking() {
    window.location.href = '/index.html#booking';
  }

  goHome() {
    window.location.href = '/index.html';
  }

  goToApartment(apartmentId: string) {
    if (apartmentId === 'artin-house-i') {
      window.location.href = '/apartment-artin-house-i.html';
    } else if (apartmentId === 'artin-house-ii') {
      window.location.href = '/apartment-artin-house-ii.html';
    }
  }
}