import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
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
    }
  ];

  averageRating = 5.0;
  totalReviews = 2;

  getStarsArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }

  // Obtener porcentaje para cada nivel de calificación
  getRatingPercentage(stars: number): number {
    if (stars === 5) return 100;
    return 0;
  }
}