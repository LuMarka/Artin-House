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

    },
  {   name: 'Juan Bautista Bainotti',
      initials: 'JB',
      date: 'Noviembre de 2025',
    
      rating: 5,
      comment: 'Tuvimos la suerte de hospedarnos en las dos propiedades de Artin House Mendoza, y la experiencia fue realmente excelente.' +
                'Los propietarios, Elizabeth y Gastón, fueron increíblemente amables y serviciales desde el primer momento. Nos aconsejaron y acompañaron en todo lo referente a la documentación para cruzar a Chile, algo que valoramos muchísimo. Su atención fue siempre tranquila, cordial y genuinamente orientada a hacer que nuestra estadía fuera perfecta.' +

                'Ambas casas son muy prolijas, limpias y completas, equipadas con todo lo necesario para sentirse como en casa. Todo parecía nuevo: las camas súper cómodas, sábanas, toallas y almohadas impecables, utensilios y detalles de excelente calidad. Los baños modernos y funcionales, y un aroma en el ambiente que hacía muy agradable cada espacio.' +

                'Realmente se nota el cuidado y dedicación que ponen en cada detalle. Sin dudas, un lugar para volver y recomendar.',
      isRecent: true,
    },
    {
      name: 'Ian Gimenez',
      initials: 'IG',
      date: 'Noviembre de 2025',
      rating: 5,
      comment: 'Muy agradable experiencia, todo muy limpio y bonito.Recomiendo al 100%.' +
               'Los dueños son un 10, están para lo que necesites, de seguro pegaré una vuelta más adelante.',
      isRecent: true,
    },
    {
      name: 'Lucas Gonzalez',
      initials: 'LG',
      date: 'Noviembre de 2025',  
      rating: 5,
      comment: 'Lindo y cómodo lugar. Muy amables y atentos sus dueños.',
      isRecent: true,
    },
    {
      name: 'Silvina Egea',
      initials: 'SE',
      date: 'Noviembre de 2025',  
      rating: 5,
      comment: 'Excelente ubicación, impecable el departamento, su limpieza, comodidades y la atención cálida de su dueña Elizabeth.',
      isRecent: true,
    },
    {
      name: 'Emilia Bordin ',
      initials: 'EB',
      date: 'Noviembre de 2025',  
      rating: 5,
      comment: 'Pasamos un estadía hermosa, el hospedaje excelente y la atención de Eli aún más.' +
                'Recomiendo Artin House para pasar unos días increíbles en Mendoza.',
      isRecent: true,
    },
    {
      name: 'Valentina Rojas',
      initials: 'AP',
      date: 'Noviembre de 2025',  
      rating: 5,
      comment: 'Me alojé hace unos días con mi familia de Bariloche. La verdad que quedamos encantados con el departamento, increíble, la comodidad, buena ubicación, y sobretodo la buena predisposición de Elizabeth y Gastón.' +
              'Estamos con ansias de poder volver de nuevo👍🏼.',
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