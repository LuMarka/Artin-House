import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

interface Amenity {
  icon: string;
  key: string;
}

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmenitiesComponent {
  private translationService = inject(TranslationService);

  title = this.translationService.translate('amenities.title');
  
  private amenityDefs: Amenity[] = [
    { icon: 'wifi', key: 'amenities.wifi' },
    { icon: 'parking', key: 'amenities.parking' },
    { icon: 'ac', key: 'amenities.ac' },
    { icon: 'heating', key: 'amenities.heating' },
    { icon: 'kitchen', key: 'amenities.kitchen' },
    { icon: 'tv', key: 'amenities.tv' },
    { icon: 'garden', key: 'amenities.garden' }
  ];

  amenities = computed(() => {
    return this.amenityDefs.map(amenity => ({
      icon: amenity.icon,
      name: this.translationService.translate(amenity.key)()
    }));
  });
}