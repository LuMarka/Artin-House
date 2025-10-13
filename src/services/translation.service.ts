import { Injectable, signal, computed, Signal } from '@angular/core';

type Translations = {
  [key: string]: { en: string; es: string; }
};

const translations: Translations = {
  // Header
  'nav.apartments': { en: 'Apartments', es: 'Departamentos' },
  'nav.amenities': { en: 'Amenities', es: 'Comodidades' },
  'nav.gallery': { en: 'Gallery', es: 'Galería' },
  'nav.bookNow': { en: 'Book Now', es: 'Reservar' },

  // Hero
  'hero.title': { en: 'Your Oasis in Luján de Cuyo', es: 'Tu Oasis en Luján de Cuyo' },
  'hero.subtitle': { en: "Experience tranquility and comfort surrounded by Mendoza's stunning landscapes.", es: 'Experimenta la tranquilidad y el confort rodeado de los impresionantes paisajes de Mendoza.' },
  'hero.button': { en: 'Reserve Your Stay', es: 'Reserva Tu Estadía' },

  // Apartments
  'apartments.title': { en: 'Our Accommodations', es: 'Nuestros Alojamientos' },
  'apartments.subtitle': { en: 'Choose between our two beautifully designed apartments, each offering a unique and comfortable experience.', es: 'Elige entre nuestros dos apartamentos elegantemente diseñados, cada uno ofreciendo una experiencia única y confortable.' },
  'apartments.artin1.title': { en: 'Artin House I', es: 'Artin House I' },
  'apartments.artin1.desc': { en: 'A spacious and bright apartment perfect for families or small groups. Features a fully equipped kitchen, modern amenities, and direct access to the garden.', es: 'Un apartamento amplio y luminoso, perfecto para familias o grupos pequeños. Cuenta con cocina totalmente equipada, comodidades modernas y acceso directo al jardín.' },
  'apartments.artin1.guests': { en: 'Sleeps up to 4 guests', es: 'Capacidad para 4 huéspedes' },
  'apartments.artin1.rooms': { en: '2 Bedrooms, 1 Bathroom', es: '2 Habitaciones, 1 Baño' },
  'apartments.artin2.title': { en: 'Artin House II', es: 'Artin House II' },
  'apartments.artin2.desc': { en: 'A cozy and intimate apartment, ideal for couples seeking a romantic getaway. Enjoy a private patio and serene views of the surrounding nature.', es: 'Un apartamento acogedor e íntimo, ideal para parejas que buscan una escapada romántica. Disfruta de un patio privado y vistas serenas de la naturaleza circundante.' },
  'apartments.artin2.guests': { en: 'Sleeps up to 2 guests', es: 'Capacidad para 2 huéspedes' },
  'apartments.artin2.rooms': { en: '1 Bedroom, 1 Bathroom', es: '1 Habitación, 1 Baño' },
  
  // Amenities
  'amenities.title': { en: 'Comforts & Conveniences', es: 'Comodidades y Servicios' },
  'amenities.wifi': { en: 'High-Speed Wi-Fi', es: 'Wi-Fi de Alta Velocidad' },
  'amenities.pool': { en: 'Swimming Pool', es: 'Piscina' },
  'amenities.parking': { en: 'Free Parking', es: 'Estacionamiento Gratuito' },
  'amenities.ac': { en: 'Air Conditioning', es: 'Aire Acondicionado' },
  'amenities.kitchen': { en: 'Fully Equipped Kitchen', es: 'Cocina Totalmente Equipada' },
  'amenities.tv': { en: 'Smart TV', es: 'Smart TV' },
  'amenities.bbq': { en: 'BBQ Grill', es: 'Parrilla' },
  'amenities.garden': { en: 'Private Garden', es: 'Jardín Privado' },

  // Gallery
  'gallery.title': { en: 'Explore Artin House', es: 'Explora Artin House' },
  'gallery.alt.livingRoom': { en: 'Spacious living room with natural light', es: 'Sala de estar espaciosa con luz natural' },
  'gallery.alt.bedroom': { en: 'Comfortable master bedroom with a king-size bed', es: 'Dormitorio principal cómodo con cama king-size' },
  'gallery.alt.kitchen': { en: 'Fully equipped modern kitchen with an island', es: 'Cocina moderna totalmente equipada con isla' },
  'gallery.alt.pool': { en: 'Swimming pool surrounded by a lush garden', es: 'Piscina rodeada de un frondoso jardín' },
  'gallery.alt.bathroom': { en: 'Sleek bathroom with a walk-in shower', es: 'Baño elegante con ducha a ras de suelo' },
  'gallery.alt.exterior': { en: 'Exterior view of the apartment complex', es: 'Vista exterior del complejo de apartamentos' },
  'gallery.alt.patio': { en: 'Outdoor patio with a grill, perfect for barbecues', es: 'Patio exterior con parrilla, perfecto para asados' },
  'gallery.alt.bedroom2': { en: 'Cozy second bedroom with twin beds', es: 'Acogedor segundo dormitorio con camas gemelas' },
  
  // Booking
  'booking.title': { en: 'Make a Reservation', es: 'Haz una Reserva' },
  'booking.subtitle': { en: 'Your Stay', es: 'Tu Estadía' },
  'booking.apartmentLabel': { en: 'Apartment', es: 'Departamento' },
  'booking.checkinLabel': { en: 'Check-in', es: 'Entrada' },
  'booking.checkoutLabel': { en: 'Check-out', es: 'Salida' },
  'booking.selectDate': { en: 'Select date', es: 'Seleccionar' },
  'booking.totalStay': { en: 'Total stay', es: 'Estadía total' },
  'booking.nights': { en: 'nights', es: 'noches' },
  'booking.bookButton': { en: 'Request to Book', es: 'Solicitar Reserva' },
  'booking.successMsg': { en: 'Booking request sent! We will contact you shortly.', es: '¡Solicitud de reserva enviada! Te contactaremos a la brevedad.' },
  'booking.errorMsg': { en: 'Please select valid check-in and check-out dates.', es: 'Por favor, selecciona fechas de entrada y salida válidas.' },
  'booking.weekdays.sun': { en: 'Sun', es: 'Dom' },
  'booking.weekdays.mon': { en: 'Mon', es: 'Lun' },
  'booking.weekdays.tue': { en: 'Tue', es: 'Mar' },
  'booking.weekdays.wed': { en: 'Wed', es: 'Mié' },
  'booking.weekdays.thu': { en: 'Thu', es: 'Jue' },
  'booking.weekdays.fri': { en: 'Fri', es: 'Vie' },
  'booking.weekdays.sat': { en: 'Sat', es: 'Sáb' },
  
  // Footer
  'footer.subtitle': { en: "Your home away from home in the heart of Argentina's wine country.", es: 'Tu hogar lejos de casa en el corazón de la tierra del vino de Argentina.' },
  'footer.contactTitle': { en: 'Contact Us', es: 'Contáctanos' },
  'footer.followTitle': { en: 'Follow Us', es: 'Síguenos' },
  'footer.copyright': { en: 'All rights reserved.', es: 'Todos los derechos reservados.' },
};

@Injectable({ providedIn: 'root' })
export class TranslationService {
  language = signal<'en' | 'es'>('es');

  private translationsData = signal<Translations>(translations);

  translate(key: string): Signal<string> {
    return computed(() => {
      const lang = this.language();
      const allTranslations = this.translationsData();
      return allTranslations[key]?.[lang] ?? key;
    });
  }

  setLanguage(lang: 'en' | 'es') {
    this.language.set(lang);
  }
}
