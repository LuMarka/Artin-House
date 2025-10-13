import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

interface Image {
  src: string;
  altKey: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class GalleryComponent {
  private translationService = inject(TranslationService);
  
  title = this.translationService.translate('gallery.title');
  
  private imageDefs: Image[] = [
    { src: 'https://picsum.photos/800/600?random=10', altKey: 'gallery.alt.livingRoom' },
    { src: 'https://picsum.photos/600/800?random=11', altKey: 'gallery.alt.bedroom' },
    { src: 'https://picsum.photos/800/600?random=12', altKey: 'gallery.alt.kitchen' },
    { src: 'https://picsum.photos/800/600?random=5', altKey: 'gallery.alt.pool' },
    { src: 'https://picsum.photos/600/800?random=13', altKey: 'gallery.alt.bathroom' },
    { src: 'https://picsum.photos/800/600?random=6', altKey: 'gallery.alt.exterior' },
    { src: 'https://picsum.photos/800/600?random=8', altKey: 'gallery.alt.patio' },
    { src: 'https://picsum.photos/600/800?random=14', altKey: 'gallery.alt.bedroom2' },
  ];

  images = computed(() => {
    return this.imageDefs.map(img => ({
      src: img.src,
      alt: this.translationService.translate(img.altKey)()
    }));
  });
}