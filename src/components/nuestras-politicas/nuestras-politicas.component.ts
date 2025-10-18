import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-nuestras-politicas',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './nuestras-politicas.component.html',
  styleUrl: './nuestras-politicas.component.css'
})
export class NuestrasPoliticasComponent {
  constructor(private translationService: TranslationService) {}

  translate(key: string) {
    return this.translationService.translate(key);
  }

  // Función para convertir texto con ** a HTML con <strong>
  translateToHtml(key: string) {
    return computed(() => {
      const text = this.translate(key)();
      return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    });
  }
}