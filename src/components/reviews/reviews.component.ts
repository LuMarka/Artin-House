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
  isAutoSlidePaused = false;
  isPermanentlyPaused = false;
  touchResumeTimeout: any;
  
  // Drag/Swipe variables
  isDragging = false;
  startX = 0;
  currentTranslate = 0;
  prevTranslate = 0;
  animationID = 0;

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
      comment: 'Hermosa casa, pasamos unos días geniales. Mariela siempre predispuesta a todo!! Y el lugar de la casa re bien, ya que está cerca de la ruta para recorrer todo.',
      isExpanded: false
    },
    {
      name: 'Antonella Manrique',
      initials: 'AM',
      date: 'Julio de 2025',
      rating: 5,
      comment: 'Hermosa casa, muy completa. Nos quedó todo súper a mano, cafés, bodegas, todo. Volveremos!',
      isExpanded: false
    },
    {
      name: 'Antonio Agustin Scoponi',
      initials: 'AS',
      date: 'Octubre de 2025',
      rating: 5,
      comment: 'Un lugar muy acogedor y recomendable. Con una excelente ubicación.',
      badge: 'Local Guide Nivel 4',
      isRecent: true,
      isExpanded: false
    },
    {
      name: 'Juan Bautista Bainotti',
      initials: 'JB',
      date: 'Noviembre de 2025',
      rating: 5,
      comment: 'Tuvimos la suerte de hospedarnos en las dos propiedades de Artin House Mendoza, y la experiencia fue realmente excelente. Los propietarios, Elizabeth y Gastón, fueron increíblemente amables y serviciales desde el primer momento. Nos aconsejaron y acompañaron en todo lo referente a la documentación para cruzar a Chile, algo que valoramos muchísimo. Su atención fue siempre tranquila, cordial y genuinamente orientada a hacer que nuestra estadía fuera perfecta. Ambas casas son muy prolijas, limpias y completas, equipadas con todo lo necesario para sentirse como en casa. Todo parecía nuevo: las camas súper cómodas, sábanas, toallas y almohadas impecables, utensilios y detalles de excelente calidad. Los baños modernos y funcionales, y un aroma en el ambiente que hacía muy agradable cada espacio. Realmente se nota el cuidado y dedicación que ponen en cada detalle. Sin dudas, un lugar para volver y recomendar.',
      badge: 'Local Guide Nivel 2',
      isRecent: true,
      isExpanded: false
    },
    {
      name: 'Ian Gimenez',
      initials: 'IG',
      date: 'Noviembre de 2025',
      rating: 5,
      comment: 'Muy agradable experiencia, todo muy limpio y bonito. Recomiendo al 100%. Los dueños son un 10, están para lo que necesites, de seguro pegaré una vuelta más adelante.',
      badge: 'Local Guide Nivel 1',
      isRecent: true,
      isExpanded: false
    },
    {
      name: 'Lucas Gonzalez',
      initials: 'LG',
      date: 'Noviembre de 2025',
      rating: 5,
      comment: 'Lindo y cómodo lugar. Muy amables y atentos sus dueños.',
      badge: 'Local Guide Nivel 3',
      isRecent: true,
      isExpanded: false
    },
    {
      name: 'Silvina Egea',
      initials: 'SE',
      date: 'Noviembre de 2025',
      rating: 5,
      comment: 'Excelente ubicación, impecable el departamento, su limpieza, comodidades y la atención cálida de su dueña Elizabeth.',
      badge: 'Local Guide Nivel 2',
      isRecent: true,
      isExpanded: false
    },
    {
      name: 'Emilia Bordin',
      initials: 'EB',
      date: 'Noviembre de 2025',
      rating: 5,
      comment: 'Pasamos un estadía hermosa, el hospedaje excelente y la atención de Eli aún más. Recomiendo Artin House para pasar unos días increíbles en Mendoza.',
      badge: 'Local Guide Nivel 1',
      isRecent: true,
      isExpanded: false
    },
    {
      name: 'Valentina Rojas',
      initials: 'VR',
      date: 'Noviembre de 2025',
      rating: 5,
      comment: 'Me alojé hace unos días con mi familia de Bariloche. La verdad que quedamos encantados con el departamento, increíble, la comodidad, buena ubicación, y sobretodo la buena predisposición de Elizabeth y Gastón. Estamos con ansias de poder volver de nuevo👍🏼.',
      badge: 'Local Guide Nivel 3',
      isRecent: true,
      isExpanded: false
    }
  ];

  averageRating = 5.0;
  totalReviews = 10;

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
    if (this.touchResumeTimeout) {
      clearTimeout(this.touchResumeTimeout);
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
    
    // Asegurar que maxIndex no permita espacios vacíos al final
    const totalItems = this.reviews.length;
    this.maxIndex = Math.max(0, totalItems - this.itemsPerView);
    
    // Si el currentIndex supera el nuevo maxIndex, ajustarlo
    if (this.currentIndex > this.maxIndex) {
      this.currentIndex = this.maxIndex;
      this.updateCarouselPosition();
    }
  }

  scrollCarousel(direction: number) {
    const newIndex = this.currentIndex + direction;
    if (newIndex >= 0 && newIndex <= this.maxIndex) {
      this.currentIndex = newIndex;
      this.updateCarouselPosition();
      // Pausar solo temporalmente al usar las flechas
      this.pauseAutoSlide();
      
      // Reanudar después de 3 segundos
      if (this.touchResumeTimeout) {
        clearTimeout(this.touchResumeTimeout);
      }
      this.touchResumeTimeout = setTimeout(() => {
        if (!this.isPermanentlyPaused) {
          this.isAutoSlidePaused = false;
        }
      }, 3000);
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
    if (this.isPermanentlyPaused) return; // No reiniciar si está pausado permanentemente
    
    this.autoSlideInterval = setInterval(() => {
      if (this.isAutoSlidePaused || this.isPermanentlyPaused) return;
      
      if (this.currentIndex >= this.maxIndex) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
      this.updateCarouselPosition();
    }, 4000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  pauseAutoSlide() {
    this.isAutoSlidePaused = true;
    // Limpiar timeout previo si existe
    if (this.touchResumeTimeout) {
      clearTimeout(this.touchResumeTimeout);
    }
  }

  resumeAutoSlide() {
    // En móviles, dar más tiempo antes de reanudar después de touch
    if (this.touchResumeTimeout) {
      clearTimeout(this.touchResumeTimeout);
    }
    
    this.touchResumeTimeout = setTimeout(() => {
      if (!this.isPermanentlyPaused) {
        this.isAutoSlidePaused = false;
      }
    }, 300); // 300ms de delay para evitar activación accidental
  }

  resumeAutoSlideAfterDrag() {
    // Reanudar el auto-slide después de arrastrar (solo si no está pausado permanentemente)
    if (this.touchResumeTimeout) {
      clearTimeout(this.touchResumeTimeout);
    }
    
    this.touchResumeTimeout = setTimeout(() => {
      if (!this.isPermanentlyPaused) {
        this.isAutoSlidePaused = false;
      }
    }, 500); // 500ms de delay después de arrastrar
  }

  restartAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  // Obtener porcentaje para cada nivel de calificación
  getRatingPercentage(stars: number): number {
    if (stars === 5) return 100;
    return 0;
  }

  // Verificar si el comentario está truncado
  isCommentTruncated(comment: string): boolean {
    return comment.length > 180;
  }

  // Alternar expansión del comentario
  toggleExpand(review: any): void {
    review.isExpanded = !review.isExpanded;
    
    // Pausar permanentemente cuando se expande para leer
    if (review.isExpanded) {
      this.isPermanentlyPaused = true;
      this.stopAutoSlide();
    }
  }

  // === DRAG & SWIPE FUNCTIONALITY ===
  
  onDragStart(event: MouseEvent): void {
    this.isDragging = true;
    this.startX = event.clientX;
    this.pauseAutoSlide();
  }

  onDragMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    
    const currentX = event.clientX;
    const diff = currentX - this.startX;
    this.updateDragPosition(diff);
  }

  onDragEnd(): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.handleDragEnd();
    this.resumeAutoSlideAfterDrag();
  }

  onTouchStart(event: TouchEvent): void {
    this.isDragging = true;
    this.startX = event.touches[0].clientX;
    this.pauseAutoSlide();
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    
    // Prevenir scroll solo si estamos arrastrando horizontalmente
    const currentX = event.touches[0].clientX;
    const diff = Math.abs(currentX - this.startX);
    
    if (diff > 10) {
      event.preventDefault();
    }
    
    this.updateDragPosition(currentX - this.startX);
  }

  onTouchEnd(): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.handleDragEnd();
    this.resumeAutoSlideAfterDrag();
  }

  private updateDragPosition(diff: number): void {
    if (!this.reviewsList) return;
    
    // Calcular la posición base según el índice actual
    const itemWidth = this.itemsPerView === 1 ? 100 : (100 / this.itemsPerView);
    const baseTranslate = -this.currentIndex * itemWidth;
    
    // Aplicar el arrastre con resistencia en los bordes
    let dragPercent = (diff / this.reviewsList.nativeElement.offsetWidth) * 100;
    
    // Agregar resistencia en los límites
    if (this.currentIndex === 0 && diff > 0) {
      dragPercent *= 0.3; // Resistencia al arrastrar más allá del inicio
    } else if (this.currentIndex === this.maxIndex && diff < 0) {
      dragPercent *= 0.3; // Resistencia al arrastrar más allá del final
    }
    
    const newTranslate = baseTranslate + dragPercent;
    this.reviewsList.nativeElement.style.transition = 'none';
    this.reviewsList.nativeElement.style.transform = `translateX(${newTranslate}%)`;
  }

  private handleDragEnd(): void {
    if (!this.reviewsList) return;
    
    const currentX = this.reviewsList.nativeElement.style.transform;
    const translateMatch = currentX.match(/translateX\((.+?)%\)/);
    
    if (translateMatch) {
      const currentTranslateValue = parseFloat(translateMatch[1]);
      const itemWidth = this.itemsPerView === 1 ? 100 : (100 / this.itemsPerView);
      const baseTranslate = -this.currentIndex * itemWidth;
      const diff = currentTranslateValue - baseTranslate;
      
      // Umbral del 20% del ancho de un item para cambiar de slide
      const threshold = itemWidth * 0.2;
      
      if (diff > threshold && this.currentIndex > 0) {
        // Arrastre hacia la derecha - volver atrás
        this.currentIndex--;
      } else if (diff < -threshold && this.currentIndex < this.maxIndex) {
        // Arrastre hacia la izquierda - avanzar
        this.currentIndex++;
      }
    }
    
    // Restaurar la transición y actualizar posición
    this.reviewsList.nativeElement.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    this.updateCarouselPosition();
  }
}