import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class AboutComponent {
  private translationService = inject(TranslationService);

  // Traducciones
  title = this.translationService.translate('about.title');
  
  location = {
    title: this.translationService.translate('about.location.title'),
    desc: this.translationService.translate('about.location.desc'),
  };
  
  experience = {
    title: this.translationService.translate('about.experience.title'),
  };
  
  hosts = {
    title: this.translationService.translate('about.hosts.title'),
    desc: this.translationService.translate('about.hosts.desc'),
  };
}