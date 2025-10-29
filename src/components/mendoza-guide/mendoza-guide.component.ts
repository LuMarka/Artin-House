import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-mendoza-guide',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './mendoza-guide.component.html',
  styleUrls: ['./mendoza-guide.component.css']
})
export class MendozaGuideComponent {
  private translationService = inject(TranslationService);

  // Translation method - directly returning the signal value
  t(key: string): string {
    const signal = this.translationService.translate(key);
    const value = signal();
    return value !== key ? value : '';
  }

  // Translation methods for each section
  getHeroTitle(): string {
    return this.t('mendozaGuide.hero.title') || '🍇 Qué hacer en Mendoza';
  }

  getHeroSubtitle(): string {
    return this.t('mendozaGuide.hero.subtitle') || 'Tu guía completa para descubrir los mejores vinos, gastronomía y aventuras de la región';
  }
  
  getWinesTitle(): string {
    return this.t('mendozaGuide.wines.title') || '🍷 Experiencias en Bodegas';
  }

  getWinesDescription(): string {
    return this.t('mendozaGuide.wines.description') || 'Mendoza es mundialmente reconocida por sus vinos excepcionales. Descubrí las mejores bodegas y experiencias enológicas que la región tiene para ofrecer.';
  }
  
  getGastronomyTitle(): string {
    return this.t('mendozaGuide.gastronomy.title') || '🍽️ Gastronomía Local';
  }

  getGastronomyDescription(): string {
    return this.t('mendozaGuide.gastronomy.description') || 'La gastronomía mendocina combina tradición e innovación. Desde asados tradicionales hasta alta cocina, cada comida es una experiencia única.';
  }
  
  getAdventureTitle(): string {
    return this.t('mendozaGuide.adventure.title') || '⛰️ Aventura y Naturaleza';
  }

  getAdventureDescription(): string {
    return this.t('mendozaGuide.adventure.description') || 'Los paisajes mendocinos ofrecen infinitas posibilidades para los amantes de la aventura. Desde relajantes termas hasta deportes extremos en la montaña.';
  }
  
  getMorePlacesTitle(): string {
    return this.t('mendozaGuide.morePlaces.title') || '🗺️ Más Lugares Imperdibles';
  }

  getMorePlacesDescription(): string {
    return this.t('mendozaGuide.morePlaces.description') || 'Descubrí otros tesoros mendocinos que complementarán tu experiencia en la región.';
  }
  
  getContactTitle(): string {
    return this.t('mendozaGuide.contact.title') || '¿Listo para tu aventura mendocina?';
  }

  getContactDescription(): string {
    return this.t('mendozaGuide.contact.description') || 'Contáctanos para más información personalizada';
  }

  getMoreInfoButton(): string {
    const translation = this.t('mendozaGuide.moreInfo.button');
    return translation || 'MÁS INFORMACIÓN TURÍSTICA';
  }

  // Wine table methods
  getWineHeaderActivity(): string {
    return this.t('mendozaGuide.wines.table.headers.activity') || '🍷 Actividad';
  }

  getWineHeaderRecommendation(): string {
    return this.t('mendozaGuide.wines.table.headers.recommendation') || '⭐ Recomendación';
  }

  getWineHeaderNotes(): string {
    return this.t('mendozaGuide.wines.table.headers.notes') || '📍 Notas';
  }

  getWineTastingActivity(): string {
    return this.t('mendozaGuide.wines.table.rows.tasting.activity') || 'Cata de vinos';
  }

  getWineCatenaRecommendation(): string {
    return this.t('mendozaGuide.wines.table.rows.tasting.recommendation') || 'Catena Zapata - Arquitectura impresionante y vinos excepcionales';
  }

  getWineOnlineNote(): string {
    return this.t('mendozaGuide.wines.table.rows.tasting.note') || 'Reservas online con descuentos especiales';
  }

  getWineTourActivity(): string {
    return this.t('mendozaGuide.wines.table.rows.tour.activity') || 'Tour con almuerzo';
  }

  getWineGourmetRecommendation(): string {
    return this.t('mendozaGuide.wines.table.rows.tour.recommendation') || 'Experiencia gourmet en Ruca Malen - Vistas panorámicas';
  }

  getWineMariageNote(): string {
    return this.t('mendozaGuide.wines.table.rows.tour.note') || 'Incluye maridaje completo y transfer';
  }

  getWinePremiumActivity(): string {
    return this.t('mendozaGuide.wines.table.rows.premium.activity') || 'Experiencia premium';
  }

  getWineAchavalRecommendation(): string {
    return this.t('mendozaGuide.wines.table.rows.premium.recommendation') || 'Achaval Ferrer - Atención personalizada y terroir único';
  }

  getWineConnoisseursNote(): string {
    return this.t('mendozaGuide.wines.table.rows.premium.note') || 'Ideal para conocedores exigentes';
  }

  getWineBikeActivity(): string {
    return this.t('mendozaGuide.wines.table.rows.bike.activity') || 'Tour en bicicleta';
  }

  getWineMaipuRecommendation(): string {
    return this.t('mendozaGuide.wines.table.rows.bike.recommendation') || 'Recorrido por Maipú - Aventura entre viñedos';
  }

  getWineBikeNote(): string {
    return this.t('mendozaGuide.wines.table.rows.bike.note') || 'Incluye alquiler de bicicletas y degustación';
  }

  // Contact methods
  getContactWhatsApp(): string {
    const translation = this.t('mendozaGuide.contact.whatsapp');
    return translation || 'WhatsApp';
  }

  getContactEmail(): string {
    const translation = this.t('mendozaGuide.contact.email');
    return translation || 'Contacto';
  }

  // Map section
  getMapTitle(): string {
    const translation = this.t('mendozaGuide.map.title');
    return translation || '🗺️ Mapa Interactivo de Lugares Recomendados';
  }

  getMapAdvice(): string {
    const translation = this.t('mendozaGuide.map.advice');
    return translation || '💡 Consejo: Usá este mapa para planificar tus rutas y calcular distancias desde Artin House';
  }

  // Gastronomy cards
  getGastronomyChacrasNote(): string {
    return this.t('mendozaGuide.gastronomy.chacras.note') || 'Consejo: Reservá con anticipación, especialmente en temporada alta.';
  }

  getGastronomyLujanTitle(): string {
    return this.t('mendozaGuide.gastronomy.lujan.title') || 'Experiencia Local en Luján';
  }

  getGastronomyLujanDescription(): string {
    return this.t('mendozaGuide.gastronomy.lujan.description') || 'Vivir como un local en Luján de Cuyo te permitirá descubrir restaurantes auténticos y mercados tradicionales. Imperdible: La feria del fin de semana y las parrillas familiares del centro.';
  }

  getGastronomyLujanLink(): string {
    return this.t('mendozaGuide.gastronomy.lujan.link') || 'Más info en mendoza.tur.ar';
  }

  // Content data - using translations for main titles and descriptions
  readonly content = {
    hero: {
      title: '🍇 Qué hacer en Mendoza',
      subtitle: 'Tu guía completa para descubrir los mejores vinos, gastronomía y aventuras de la región'
    },
    
    wines: {
      title: '🍷 Experiencias en Bodegas',
      description: 'Mendoza es mundialmente reconocida por sus vinos excepcionales. Descubrí las mejores bodegas y experiencias enológicas que la región tiene para ofrecer.',
      
      table: {
        headers: ['ACTIVIDAD', 'RECOMENDACIÓN DE ARTIN HOUSE', 'PARA TENER EN CUENTA'],
        rows: [
          {
            activity: 'Cata y Tours',
            recommendation: 'Visitá bodegas históricas como Catena Zapata, Norton o Achaval Ferrer.',
            note: '¡Imprescindible reservar! Las bodegas premium agotan sus cupos con días de anticipación.'
          },
          {
            activity: 'Almuerzos Gourmet',
            recommendation: 'Disfrutá de un almuerzo de pasos (maridaje) con vistas a los viñedos. Consultá el menú en Bodega Séptima o El Enemigo (Chachingo).',
            note: 'Busca la Foto: Sube una imagen de una copa de Malbec con los viñedos de fondo.'
          },
          {
            activity: '🧭 Tip de Elizabeth',
            recommendation: 'Preguntame por tours menos conocidos y familiares. ¡Ideales para una experiencia íntima! También te recomiendo El Manzano Histórico donde San Martín planificó el cruce de los Andes.',
            note: 'Rutas secretas y lugares únicos'
          }
        ]
      }
    },

    gastronomy: {
      title: '🍽️ Gastronomía Local',
      description: 'La gastronomía mendocina combina tradición e innovación. Desde asados tradicionales hasta alta cocina, cada comida es una experiencia única.',
      
      locations: [
        {
          title: 'Chacras de Coria',
          description: 'El barrio gourmet de Mendoza. Aquí encontrarás los mejores restaurantes, desde parrillas tradicionales hasta cocina de autor. Recomendado: Almorzar en 1884 Restaurant (Francis Mallmann) o Azafrán.',
          note: 'Consejo: Reservá con anticipación, especialmente en temporada alta.'
        },
        {
          title: 'Experiencia Local en Luján',
          description: 'Vivir como un local en Luján de Cuyo te permitirá descubrir restaurantes auténticos y mercados tradicionales. Imperdible: La feria del fin de semana y las parrillas familiares del centro.',
          link: 'https://mendoza.tur.ar/buscador-servicios-turisticos/?tax%5Bzona%5D%5B0%5D=113&tax%5Btipo-de-lugar%5D%5B0%5D=40',
          linkText: 'Más info en mendoza.tur.ar'
        }
      ]
    },

    adventure: {
      title: '⛰️ Aventura y Naturaleza',
      description: 'Los paisajes mendocinos ofrecen infinitas posibilidades para los amantes de la aventura. Desde relajantes termas hasta deportes extremos en la montaña.',
      
      locations: [
        {
          title: '🏔️ Potrerillos',
          description: 'A solo 50km de Luján, Potrerillos es perfecto para un día de aventura. Disfrutá del lago, deportes acuáticos, trekking y las mejores vistas de la precordillera. Recomendado: Almorzar con vista al dique.',
          note: 'Ideal para: Kayak, stand up paddle, pesca y caminatas.',
          image: 'src/assets/paisajes/potrerillos-turismo.webp'
        },
        {
          title: '♨️ Termas de Cacheuta',
          description: 'Cacheuta ofrece la experiencia perfecta de relajación en aguas termales naturales. Combiná el relax en las termas con actividades como tirolesa y rafting en el río Mendoza.',
          link: 'https://termascacheuta.com/',
          linkText: 'Más info en termascacheuta.com',
          image: 'src/assets/paisajes/TermasCacheuta.jpg'
        },
        {
          title: '🚇 Túnel Potrerillos-Cacheuta',
          description: 'El túnel histórico que conecta Potrerillos con Cacheuta es una obra de ingeniería fascinante. Este paso te permite disfrutar de ambos destinos en un mismo día, combinando aventura acuática con relajación termal.',
          note: 'Ruta escénica: El túnel ofrece vistas únicas de la precordillera mendocina.',
          image: 'src/assets/paisajes/tunelPotrerillosCacheuta.jpg'
        }
      ]
    },

    morePlaces: {
      title: '🗺️ Más Lugares Imperdibles',
      description: 'Descubrí otros tesoros mendocinos que complementarán tu experiencia en la región.',
      
      places: [
        {
          title: '📜 El Manzano Histórico',
          description: 'Lugar histórico donde San Martín planificó el cruce de los Andes. Un sitio emblemático con una estancia colonial y museo que cuenta la historia de la independencia americana.',
          distance: '📍 A 45 min de Luján',
          image: 'src/assets/paisajes/manzano-historico.webp'
        },
        {
          title: '🎭 Teatro Independencia',
          description: 'Hermoso teatro histórico en el centro de Mendoza. Consultá la cartelera para disfrutar de obras, conciertos y espectáculos de tango.',
          distance: '📍 En Ciudad de Mendoza',
          image: 'src/assets/paisajes/teatro-independencia.jpg'
        },
        {
          title: '🌳 Parque San Martín',
          description: 'Uno de los parques urbanos más bellos de Argentina. Ideal para caminatas, visitar el Cerro de la Gloria y disfrutar de los lagos artificiales.',
          distance: '📍 En Ciudad de Mendoza',
          image: 'src/assets/paisajes/parqueSanMartin.jpg'
        },
        {
          title: '🏔️ Aconcagua',
          description: 'La montaña más alta de América. Aunque el trekking completo requiere preparación, podés visitar el Parque Provincial y disfrutar de las vistas.',
          distance: '📍 A 2.5 horas de Luján',
          image: 'src/assets/paisajes/aconcagua.jpg'
        },
        {
          title: '🎿 Las Leñas',
          description: 'Centro de esquí de fama mundial (temporada invernal). En verano, perfecto para trekking de alta montaña y vistas espectaculares.',
          distance: '📍 A 4 horas de Luján',
          image: 'src/assets/paisajes/lasLeñas.jpg'
        },
        {
          title: '🌿 Reserva Natural Villavicencio',
          description: 'Reserva natural protegida con paisajes únicos y la famosa agua mineral. El camino de acceso ofrece vistas espectaculares de la precordillera.',
          distance: '📍 A 1.5 horas de Luján',
          image: 'src/assets/paisajes/termasVillavicencio.jpg',
          link: 'https://rnvillavicencio.com.ar/'
        },
        {
          title: 'Las Cuevas y Cristo Redentor',
          description: 'Las Cuevas, el último pueblo antes de cruzar a Chile, te invita a vivir la altura de los Andes. Rodeado de imponentes paisajes, desde aquí se accede al majestuoso Cristo Redentor, a más de 3.800 m, símbolo de unión y paz entre Argentina y Chile. Un destino ideal para sentir la cordillera en su máxima expresión.',
          distance: '📍 A 2.40 horas de Luján',
          image: 'src/assets/paisajes/cristoredentor.jpeg'
        },
        {
          title: 'Puente del Inca',
          description: 'Maravilla natural que deslumbra con sus vibrantes tonos minerales y su historia ancestral. Parte del Qhapaq Ñan, Patrimonio de la Humanidad, invita a descubrir sus formaciones únicas, las ruinas de antiguos baños termales y una capilla que guarda el espíritu de la cordillera.',
          distance: '📍 A 2.15 horas de Luján',
          image: 'src/assets/paisajes/puenteDelInca.jpg'
        },
        {
          title: ' Minas Jesuitas de Paramillos',
          description: 'Entre montañas y leyendas, las Ruinas de las Minas Jesuitas de Paramillos revelan la historia más antigua de la minería argentina. A 2.800 msnm, este misterioso sitio combina patrimonio, fe y misterio, donde aún parecen resonar los ecos de quienes buscaron oro entre los Andes.',
          distance: '📍 A 1.5 horas de Luján',
          image: 'src/assets/paisajes/minasDeParamillo.jpg'
        }
      ]
    },

    contact: {
      title: '¿Listo para tu aventura mendocina?',
      description: 'Contáctanos para más información personalizada',
      whatsapp: {
        url: 'https://wa.me/5492615901250?text=Hola!%20Quiero%20información%20sobre%20qué%20hacer%20en%20Mendoza',
        text: 'WhatsApp'
      },
      email: {
        text: 'Contacto'
      }
    },

    links: {
      mendozaTurWine: 'https://mendoza.tur.ar/destino/vino/',
      lujanInfo: 'https://mendoza.tur.ar/lujan-de-cuyo',
      villavicencio: 'https://rnvillavicencio.com.ar/',
      mendozaTur: 'https://mendoza.tur.ar/'
    }
  };

  // Chacras de Coria gastronomy card
  getGastronomyChacrasTitle(): string {
    return this.t('mendozaGuide.gastronomy.chacras.title') || '🍽️ Chacras de Coria';
  }

  getGastronomyChacrasDescription(): string {
    return this.t('mendozaGuide.gastronomy.chacras.description') || 'El distrito gastronómico más exclusivo de Mendoza. Restaurantes gourmet con vista a los viñedos y una propuesta culinaria de primer nivel mundial.';
  }

  // Adventure cards
  getAdventurePotrerillosTitle(): string {
    return this.t('mendozaGuide.adventure.potrerillos.title') || '🏔️ Potrerillos';
  }

  getAdventurePotrerillosDescription(): string {
    return this.t('mendozaGuide.adventure.potrerillos.description') || 'A solo 50km de Luján, Potrerillos es perfecto para un día de aventura. Disfrutá del lago, deportes acuáticos, trekking y las mejores vistas de la precordillera.';
  }

  getAdventurePotrerillosNote(): string {
    return this.t('mendozaGuide.adventure.potrerillos.note') || 'Ideal para: Kayak, stand up paddle, pesca y caminatas.';
  }

  getAdventureCacheutaTitle(): string {
    return this.t('mendozaGuide.adventure.cacheuta.title') || '♨️ Termas de Cacheuta';
  }

  getAdventureCacheutaDescription(): string {
    return this.t('mendozaGuide.adventure.cacheuta.description') || 'Cacheuta ofrece la experiencia perfecta de relajación en aguas termales naturales. Combiná el relax en las termas con actividades como tirolesa y rafting en el río Mendoza.';
  }

  getAdventureTunnelTitle(): string {
    return this.t('mendozaGuide.adventure.tunnel.title') || '🚇 Túnel Potrerillos-Cacheuta';
  }

  getAdventureTunnelDescription(): string {
    return this.t('mendozaGuide.adventure.tunnel.description') || 'El túnel histórico que conecta Potrerillos con Cacheuta es una obra de ingeniería fascinante. Este paso te permite disfrutar de ambos destinos en un mismo día.';
  }

  getAdventureTunnelNote(): string {
    return this.t('mendozaGuide.adventure.tunnel.note') || 'Ruta escénica: El túnel ofrece vistas únicas de la precordillera mendocina.';
  }

  // More places cards
  getPlacesManzanoTitle(): string {
    return this.t('mendozaGuide.places.manzano.title') || '📜 El Manzano Histórico';
  }

  getPlacesManzanoDescription(): string {
    return this.t('mendozaGuide.places.manzano.description') || 'Lugar histórico donde San Martín planificó el cruce de los Andes. Un sitio emblemático con una estancia colonial y museo que cuenta la historia de la independencia americana.';
  }

  getPlacesTeatroTitle(): string {
    return this.t('mendozaGuide.places.teatro.title') || '🎭 Teatro Independencia';
  }

  getPlacesTeatroDescription(): string {
    return this.t('mendozaGuide.places.teatro.description') || 'Hermoso teatro histórico en el centro de Mendoza. Consultá la cartelera para disfrutar de obras, conciertos y espectáculos de tango.';
  }

  getPlacesParqueTitle(): string {
    return this.t('mendozaGuide.places.parque.title') || '🌳 Parque San Martín';
  }

  getPlacesParqueDescription(): string {
    return this.t('mendozaGuide.places.parque.description') || 'Uno de los parques urbanos más bellos de Argentina. Ideal para caminatas, visitar el Cerro de la Gloria y disfrutar de los lagos artificiales.';
  }

  // Distance and location texts
  getManzanoDistance(): string {
    return this.t('mendozaGuide.places.manzano.distance') || '📍 A 45 min de Luján';
  }

  getTeatroLocation(): string {
    return this.t('mendozaGuide.places.teatro.location') || '📍 En Ciudad de Mendoza';
  }

  getParqueLocation(): string {
    return this.t('mendozaGuide.places.parque.location') || '📍 En Ciudad de Mendoza';
  }

  // Link texts
  getCacheutaLinkText(): string {
    return this.t('mendozaGuide.adventure.cacheuta.linkText') || 'Más info en termascacheuta.com';
  }

  getMoreInfoText(): string {
    return this.t('mendozaGuide.gastronomy.lujan.moreInfoText') || 'Más info';
  }



  // Helper methods to get correct images from backgroundImages object
  getAdventureImage(title: string): string {
    if (title.includes('Potrerillos')) return this.backgroundImages.potrerillos;
    if (title.includes('Cacheuta')) return this.backgroundImages.cacheuta;
    if (title.includes('Túnel')) return this.backgroundImages.tunel;
    return 'assets/paisajes/default.jpg';
  }

  getPlaceImage(title: string): string {
    if (title.includes('Manzano')) return this.backgroundImages.manzano;
    if (title.includes('Teatro')) return this.backgroundImages.teatro;
    if (title.includes('Parque')) return this.backgroundImages.parque;
    if (title.includes('Aconcagua')) return this.backgroundImages.aconcagua;
    if (title.includes('Las Leñas')) return this.backgroundImages.lasLenas;
    if (title.includes('Villavicencio')) return this.backgroundImages.villavicencio;
    if (title.includes('Cristo')) return this.backgroundImages.cristoRedentor;
    if (title.includes('Puente')) return this.backgroundImages.puenteDelInca;
    if (title.includes('Minas')) return this.backgroundImages.minasParamillos;
    return 'assets/lugares/default.jpg';
  }

  // Background images for sections - using local authentic Mendoza images
  readonly backgroundImages = {
    hero: 'src/assets/paisajes/mendoza.jpg',
    wines: 'src/assets/paisajes/bodegas.webp',
    gastronomy: 'src/assets/paisajes/gastronomia.png',
    // Adventure images
    potrerillos: 'src/assets/paisajes/potrerillos-turismo.webp',
    cacheuta: 'src/assets/paisajes/TermasCacheuta.jpg',
    tunel: 'src/assets/paisajes/tunelPotrerillosCacheuta.jpg',
    // More places images
    manzano: 'src/assets/paisajes/manzano-historico.webp',
    teatro: 'src/assets/paisajes/teatro-independencia.jpg',
    parque: 'src/assets/paisajes/parqueSanMartin.jpg',
    aconcagua: 'src/assets/paisajes/aconcagua.jpg',
    lasLenas: 'src/assets/paisajes/lasLeñas.jpg',
    villavicencio: 'src/assets/paisajes/termasVillavicencio.jpg',
    cristoRedentor: 'src/assets/paisajes/cristoredentor.jpeg',
    puenteDelInca: 'src/assets/paisajes/puenteDelInca.jpg',
    minasParamillos: 'src/assets/paisajes/minasDeParamillo.jpg'
  };

  // Adventure location translation methods
  getAdventureLocationTitle(originalTitle: string): string {
    const titleKey = this.getAdventureLocationKey(originalTitle, 'title');
    return this.t(titleKey) || originalTitle;
  }

  getAdventureLocationDescription(originalTitle: string): string {
    const descKey = this.getAdventureLocationKey(originalTitle, 'description');
    return this.t(descKey) || this.getOriginalAdventureDescription(originalTitle);
  }

  getAdventureLocationNote(originalTitle: string): string {
    const noteKey = this.getAdventureLocationKey(originalTitle, 'note');
    return this.t(noteKey) || this.getOriginalAdventureNote(originalTitle);
  }

  getAdventureLocationLinkText(originalTitle: string): string {
    const linkKey = this.getAdventureLocationKey(originalTitle, 'linkText');
    return this.t(linkKey) || this.getOriginalAdventureLinkText(originalTitle);
  }

  private getAdventureLocationKey(title: string, field: string): string {
    if (title.includes('Potrerillos')) return `mendozaGuide.adventure.potrerillos.${field}`;
    if (title.includes('Cacheuta')) return `mendozaGuide.adventure.cacheuta.${field}`;
    if (title.includes('Túnel')) return `mendozaGuide.adventure.tunel.${field}`;
    return `mendozaGuide.adventure.unknown.${field}`;
  }

  // More Places translation methods
  getPlaceTitle(originalTitle: string): string {
    const titleKey = this.getPlaceKey(originalTitle, 'title');
    return this.t(titleKey) || originalTitle;
  }

  getPlaceDescription(originalTitle: string): string {
    const descKey = this.getPlaceKey(originalTitle, 'description');
    return this.t(descKey) || this.getOriginalPlaceDescription(originalTitle);
  }

  getPlaceDistance(originalTitle: string): string {
    const distanceKey = this.getPlaceKey(originalTitle, 'distance');
    return this.t(distanceKey) || this.getOriginalPlaceDistance(originalTitle);
  }

  getMoreInfoLinkText(): string {
    return this.t('mendozaGuide.places.more.info') || 'Más info';
  }

  private getPlaceKey(title: string, field: string): string {
    if (title.includes('Manzano')) return `mendozaGuide.morePlaces.manzano.${field}`;
    if (title.includes('Teatro') || title.includes('Independencia')) return `mendozaGuide.morePlaces.teatro.${field}`;
    if (title.includes('Parque') || title.includes('San Martín')) return `mendozaGuide.morePlaces.parque.${field}`;
    if (title.includes('Aconcagua')) return `mendozaGuide.morePlaces.aconcagua.${field}`;
    if (title.includes('Las Leñas') || title.includes('Leñas')) return `mendozaGuide.morePlaces.lasLenas.${field}`;
    if (title.includes('Villavicencio')) return `mendozaGuide.morePlaces.villavicencio.${field}`;
    if (title.includes('Cristo') || title.includes('Las Cuevas')) return `mendozaGuide.morePlaces.cristoRedentor.${field}`;
    if (title.includes('Puente') || title.includes('Inca')) return `mendozaGuide.morePlaces.puenteDelInca.${field}`;
    if (title.includes('Minas') || title.includes('Paramillos') || title.includes('Jesuitas')) return `mendozaGuide.morePlaces.minasParamillos.${field}`;
    return `mendozaGuide.morePlaces.unknown.${field}`;
  }

  // Helper methods to get original content as fallbacks
  private getOriginalAdventureDescription(title: string): string {
    const location = this.content.adventure.locations.find(loc => loc.title === title);
    return location?.description || '';
  }

  private getOriginalAdventureNote(title: string): string {
    const location = this.content.adventure.locations.find(loc => loc.title === title);
    return location?.note || '';
  }

  private getOriginalAdventureLinkText(title: string): string {
    const location = this.content.adventure.locations.find(loc => loc.title === title);
    return location?.linkText || '';
  }

  private getOriginalPlaceDescription(title: string): string {
    const place = this.content.morePlaces.places.find(place => place.title === title);
    return place?.description || '';
  }

  private getOriginalPlaceDistance(title: string): string {
    const place = this.content.morePlaces.places.find(place => place.title === title);
    return place?.distance || '';
  }


}