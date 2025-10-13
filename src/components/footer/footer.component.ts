import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private translationService = inject(TranslationService);
  currentYear = new Date().getFullYear();

  t = {
    subtitle: this.translationService.translate('footer.subtitle'),
    contactTitle: this.translationService.translate('footer.contactTitle'),
    followTitle: this.translationService.translate('footer.followTitle'),
    copyright: this.translationService.translate('footer.copyright'),
  }
}