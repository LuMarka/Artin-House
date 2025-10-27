import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('reviewsList') reviewsList!: ElementRef;
  
  currentIndex = 0;
  maxIndex = 0;
  itemsPerView = 1;
  autoSlideInterval: any;

  constructor(private translationService: TranslationService) {}
  
  t = {
    title: this.translationService.translate('reviews.title'),
    totalReviews: this.translationService.translate('reviews.totalReviews'),
  };
  
  reviews = [
    {
      name: 'Alma Romero',
      initials: 'AR',
      date: 'Agosto de 2025',
      rating: 5,
      comment: 'Hermosa casa, pasamos unos días geniales. Mariela siempre predispuesta a todo!! Y el lugar de la casa re bien, ya que está cerca de la ruta para recorrer todo.'
    },
    {
      name: 'Antonella Manrique',
      initials: 'AM',
      date: 'Julio de 2025',
      rating: 5,
      comment: 'Hermosa casa, muy completa. Nos quedó todo súper a mano, cafés, bodegas, todo. Volveremos!'
    },
    {
      name: 'Antonio Agustin Scoponi',
      initials: 'AS',
      date: 'Octubre de 2025',
      rating: 5,
      comment: 'Un lugar muy acogedor y recomendable. Con una excelente ubicación.',
      badge: 'Local Guide',
      isRecent: true,

    }
  ];

  averageRating = 5.0;
  totalReviews = 3;

  getStarsArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }

  ngAfterViewInit() {
    this.updateCarouselSettings();
    this.startAutoSlide();
    window.addEventListener('resize', () => this.updateCarouselSettings());
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
    window.removeEventListener('resize', () => this.updateCarouselSettings());
  }

  updateCarouselSettings() {
    const width = window.innerWidth;
    if (width >= 1024) {
      this.itemsPerView = 3;
    } else if (width >= 768) {
      this.itemsPerView = 2;
    } else {
      this.itemsPerView = 1;
    }
    this.maxIndex = Math.max(0, this.reviews.length - this.itemsPerView);
    this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
  }

  scrollCarousel(direction: number) {
    const newIndex = this.currentIndex + direction;
    if (newIndex >= 0 && newIndex <= this.maxIndex) {
      this.currentIndex = newIndex;
      this.updateCarouselPosition();
      this.restartAutoSlide();
    }
  }

  updateCarouselPosition() {
    if (this.reviewsList) {
      if (this.itemsPerView === 1) {
        // Para móviles: centrar cada card individual
        const itemWidth = 100;
        const translateX = -this.currentIndex * itemWidth;
        this.reviewsList.nativeElement.style.transform = `translateX(${translateX}%)`;
      } else {
        // Para tablet/desktop: mostrar múltiples cards
        const itemWidth = 100 / this.itemsPerView;
        const translateX = -this.currentIndex * itemWidth;
        this.reviewsList.nativeElement.style.transform = `translateX(${translateX}%)`;
      }
    }
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      if (this.currentIndex >= this.maxIndex) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
      this.updateCarouselPosition();
    }, 4000);
  }

  restartAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
    this.startAutoSlide();
  }

  // Obtener porcentaje para cada nivel de calificación
  getRatingPercentage(stars: number): number {
    if (stars === 5) return 100;
    return 0;
  }
}