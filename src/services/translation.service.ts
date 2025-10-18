import { Injectable, signal, computed, Signal } from '@angular/core';

type Translations = {
  [key: string]: { en: string; es: string; }
};

const translations: Translations = {
  // Header
  'nav.about': { en: 'About Us', es: 'Nosotros' },
  'nav.apartments': { en: 'Apartments', es: 'Departamentos' },
  'nav.artinHouseI': { en: 'Artin House I', es: 'Artin House I' },
  'nav.artinHouseII': { en: 'Artin House II', es: 'Artin House II' },
  'nav.amenities': { en: 'Amenities', es: 'Comodidades' },
  'nav.gallery': { en: 'Gallery', es: 'Galería' },
  'nav.contact': { en: 'Contact', es: 'Contacto' },
  'nav.bookNow': { en: 'Book Now', es: 'Reservar' },
  'nav.policies': { en: 'Our Policies', es: 'Nuestras Políticas' },

  // Hero
  'hero.title': { en: 'Your Oasis in Luján de Cuyo', es: 'Tu Oasis en Luján de Cuyo' },
  'hero.subtitle': { en: "Experience tranquility and comfort surrounded by Mendoza's stunning landscapes.", es: 'Experimenta la tranquilidad y el confort rodeado de los impresionantes paisajes de Mendoza.' },
  'hero.button': { en: 'Reserve Your Stay', es: 'Reserva Tu Estadía' },

  // Apartments
  'apartments.title': { en: 'Our Accommodations', es: 'Nuestros Alojamientos' },
  'apartments.subtitle': { en: 'Choose between our two beautifully designed apartments, each offering a unique and comfortable experience.', es: 'Elige entre nuestros dos apartamentos elegantemente diseñados, cada uno ofreciendo una experiencia única y confortable.' },
  'apartments.artin1.title': { en: 'Artin House I', es: 'Artin House I' },
  'apartments.artin1.desc': { en: 'A spacious and bright apartment perfect for families or small groups. Features a fully equipped kitchen, modern amenities, and direct access to the garden.', es: 'Un apartamento amplio y luminoso, perfecto para familias o grupos pequeños. Cuenta con cocina totalmente equipada, comodidades modernas y acceso directo al jardín.' },
  'apartments.artin1.guests': { en: 'Sleeps up to 6 guests', es: 'Capacidad para 6 huéspedes' },
  'apartments.artin1.rooms': { en: '2 Bedrooms, 1 Bathroom', es: '2 Habitaciones, 1 Baño' },
  'apartments.artin2.title': { en: 'Artin House II', es: 'Artin House II' },
  'apartments.artin2.desc': { en: 'A cozy and intimate apartment, ideal for couples seeking a romantic getaway. Enjoy a private patio and serene views of the surrounding nature.', es: 'Un apartamento acogedor e íntimo, ideal para parejas que buscan una escapada romántica. Disfruta de un patio privado y vistas serenas de la naturaleza circundante.' },
  'apartments.artin2.guests': { en: 'Sleeps up to 2 guests', es: 'Capacidad para 2 huéspedes' },
  'apartments.artin2.rooms': { en: '1 Bedroom, 1 Bathroom', es: '1 Habitación, 1 Baño' },
  
  // About Artin House
  'about.title': { en: 'Welcome to Artin House', es: 'Bienvenidos a Artin House' },
  'about.location.title': { en: 'Prime Location in Luján de Cuyo', es: 'Ubicación Privilegiada en Luján de Cuyo' },
  'about.location.desc': { en: 'Located in the heart of Luján de Cuyo, in a vibrant and welcoming environment. You\'ll be just steps away from charming cafés, delicious restaurants, and the main square of the department. This place offers you the tranquility of a friendly neighborhood, where you can enjoy local events and all the city services at your fingertips.', es: 'Ubicado en el corazón de Luján de Cuyo, en un entorno vibrante y acogedor. Estarás a pocos pasos de cafés encantadores, restaurantes deliciosos y la plaza principal del departamento. Este lugar te brinda la tranquilidad de un vecindario amigable, donde podrás disfrutar de eventos locales y todos los servicios de la ciudad al alcance de tu mano.' },
  'about.experience.title': { en: 'Come and Enjoy the Best Quality of Life in Mendoza!', es: '¡Vení y Disfrutá la Mejor Calidad de Vida en Mendoza!' },
  'about.hosts.title': { en: 'Your Hosts in Mendoza', es: 'Tus Anfitriones en Mendoza' },
  'about.hosts.desc': { en: 'We are Artin House, your hosts in Mendoza, and we want you to feel at home from the moment you arrive. As someone who loves sharing the beauty of Mendoza, we will offer you personalized recommendations about the best places to visit, taste wines, and enjoy the local culture.', es: 'Somos Artin House, tus anfitriones en Mendoza, y queremos que te sientas como en casa desde el momento en que llegues. Como quienes amamos compartir la belleza de Mendoza, te ofreceremos recomendaciones personalizadas sobre los mejores lugares para visitar, degustar vinos y disfrutar de la cultura local.' },
  'about.rules.title': { en: 'Simple House Rules', es: 'Normas Sencillas de la Casa' },
  'about.rules.desc': { en: 'Our house rules are simple but very important for everyone\'s comfort: no smoking inside the property, no parties, and no additional guests beyond those registered. We want to maintain a peaceful and respectful environment for all our guests.', es: 'Las normas de la casa son sencillas pero muy importantes para el confort de todos: no fumar en el interior de la vivienda, no realizar fiestas, y no invitados adicionales a los registrados. Queremos mantener un ambiente tranquilo y respetuoso para todos nuestros huéspedes.' },
  
  // Policies Page
  'policies.title': { en: 'Our Policies - Artin House I & II', es: 'Nuestras Políticas – Artin House I & II' },
  'policies.welcome': { en: 'Welcome to **Artin House**, your apartments in the heart of Luján de Cuyo, Mendoza. We want your stay to be pleasant and comfortable. Below, we detail everything you need to know about our facilities, services, booking conditions, and house rules.', es: 'Bienvenidos a **Artin House**, tus departamentos en el corazón de Luján de Cuyo, Mendoza. Queremos que tu estadía sea placentera y cómoda. A continuación, te detallamos todo lo que necesitas saber sobre nuestras instalaciones, servicios, condiciones de reserva y normas de la casa.' },
  
  'policies.apartments.title': { en: 'Our Apartments', es: 'Nuestros Departamentos' },
  'policies.apartments.desc': { en: 'Artin House consists of two independent and fully equipped apartments:', es: 'Artin House se compone de dos departamentos independientes y totalmente equipados:' },
  'policies.apartments.house1': { en: '**Artin House I:** Capacity for up to **6 guests**. Ideal for families.', es: '**Artin House I:** Capacidad para hasta **6 huéspedes**. Ideal para familias.' },
  'policies.apartments.house2': { en: '**Artin House II:** Capacity for **2 guests**. Perfect for couples.', es: '**Artin House II:** Capacidad para **2 huéspedes**. Perfecto para parejas.' },
  
  'policies.amenities.title': { en: 'Amenities and Services', es: 'Comodidades y Servicios' },
  'policies.amenities.desc': { en: 'We offer a complete environment so you can enjoy your visit to the fullest:', es: 'Ofrecemos un entorno completo para que disfrutes al máximo tu visita:' },
  
  'policies.booking.title': { en: 'Booking Conditions', es: 'Condiciones de la Reserva' },
  'policies.booking.advance': { en: 'To confirm your reservation, we request an **advance payment of 30%** of the total cost as a deposit. The **remaining balance** is paid at check-in.', es: 'Para confirmar tu reserva, solicitamos un **pago anticipado del 30%** del costo total en concepto de seña. El **saldo restante** se abona en el momento del ingreso (Check-in).' },
  'policies.booking.minimum': { en: 'The minimum required stay is **2 Nights**.', es: 'La estadía mínima requerida es de **2 Noches**.' },
  'policies.booking.discount': { en: 'From **4 nights or more**, you get a **10% discount** on your total reservation.', es: 'A partir de **4 noches o más**, contás con un **10% de descuento** en el total de tu reserva.' },
  
  'policies.cancellation.title': { en: 'Cancellation Policy (Flexible)', es: 'Política de Cancelación (Flexible)' },
  'policies.cancellation.desc': { en: 'We offer a flexible cancellation policy for your peace of mind: Upon cancellation by the guest, the amount paid as deposit is not lost. It will be assigned as **credit in pesos** for use in a future reservation. The new reservation must be made within **6 months** after the original cancellation and will be subject to availability.', es: 'Ofrecemos una política de cancelación flexible para tu tranquilidad: Ante la cancelación por parte del huésped, el importe abonado en concepto de seña no se pierde. Se asignará como **crédito en pesos** para utilizar en una futura reserva. La nueva reserva deberá realizarse dentro de los **6 meses** posteriores a la cancelación original y estará sujeta a la disponibilidad de nuestros departamentos.' },
  
  'policies.schedule.title': { en: 'Check-in and Check-out Times', es: 'Horarios de Ingreso y Egreso' },
  'policies.schedule.checkin': { en: '**Check-in:** 11:00 AM', es: '**Check-in (Ingreso):** 11:00 hs' },
  'policies.schedule.checkout': { en: '**Check-out:** 3:00 PM', es: '**Check-out (Egreso):** 15:00 hs' },
  
  'policies.rules.title': { en: 'Accommodation Rules', es: 'Normas del Alojamiento' },
  'policies.rules.desc': { en: 'Our rules are simple and essential to ensure harmonious coexistence and care for our facilities:', es: 'Nuestras normas son sencillas y esenciales para garantizar una convivencia armoniosa y el cuidado de nuestras instalaciones:' },
  'policies.rules.smoking.title': { en: 'No Smoking', es: 'Prohibido Fumar' },
  'policies.rules.smoking.desc': { en: 'Smoking is not permitted inside the property.', es: 'No está permitido fumar dentro de la propiedad.' },
  'policies.rules.parties.title': { en: 'No Parties', es: 'Prohibidas las Fiestas' },
  'policies.rules.parties.desc': { en: 'Parties or loud events are not allowed.', es: 'No están permitidas fiestas o eventos ruidosos.' },
  'policies.rules.guests.title': { en: 'Registered Guests Only', es: 'Solo Huéspedes Registrados' },
  'policies.rules.guests.desc': { en: 'Additional guests beyond those registered are not permitted.', es: 'No se permiten huéspedes adicionales a los registrados.' },
  'policies.rules.noise.title': { en: 'Quiet Hours', es: 'Horarios de Silencio' },
  'policies.rules.noise.desc': { en: 'Please maintain quiet hours from 10:00 PM to 8:00 AM.', es: 'Por favor mantenga horarios de silencio de 22:00 a 08:00 hs.' },
  
  'policies.deposit.title': { en: 'Security Deposit Policy', es: 'Política de Garantía (Depósito de Seguridad)' },
  'policies.deposit.desc': { en: 'To protect our facilities and contents, a Security Deposit will be requested upon check-in. The amount will be equivalent to the cost of one (1) night of accommodation. This deposit is retained as collateral to cover possible material damage, breakage, or missing items that may occur during the stay.', es: 'Para proteger nuestras instalaciones y sus contenidos, se solicitará un Depósito de Seguridad al momento de tu ingreso. El valor será equivalente al costo de una (1) noche de alojamiento. Este depósito se retendrá como fianza para cubrir posibles daños materiales, roturas o faltantes que pudieran ocurrir durante la estadía.' },
  
  'policies.thankYou': { en: '**Thank you for choosing Artin House! We look forward to welcoming you soon in Luján de Cuyo.**', es: '**¡Gracias por elegir Artin House! Esperamos recibirlos pronto en Luján de Cuyo.**' },
  
  // Amenities
  'amenities.title': { en: 'Comforts & Conveniences', es: 'Comodidades y Servicios' },
  'amenities.wifi': { en: 'High-Speed Wi-Fi', es: 'Wi-Fi' },
  'amenities.parking': { en: 'Free Parking', es: 'Estacionamiento Gratuito' },
  'amenities.ac': { en: 'Air Conditioning', es: 'Aire Acondicionado' },
  'amenities.heating': { en: 'Heating', es: 'Calefacción' },
  'amenities.kitchen': { en: 'Fully Equipped Kitchen', es: 'Cocina Equipada' },
  'amenities.tv': { en: 'Smart TV', es: 'Smart TV' },
  'amenities.garden': { en: 'Private Garden', es: 'Jardín Privado' },

  // Gallery
  'gallery.title': { en: 'Explore Artin House', es: 'Explora Artin House' },
  'gallery.alt.dormitorioPrincipal': { en: 'Spacious bedroom with natural light', es: 'Dormitorio espacioso con luz natural' },
  'gallery.alt.bedroom': { en: 'Comfortable master bedroom with a king-size bed', es: 'Dormitorio principal cómodo con cama king-size' },
  'gallery.alt.kitchen': { en: 'Fully equipped modern kitchen with an island', es: 'Cocina moderna totalmente equipada con isla' },
  'gallery.alt.pool': { en: 'Swimming pool surrounded by a lush garden', es: 'Piscina rodeada de un frondoso jardín' },
  'gallery.alt.bathroom': { en: 'Sleek bathroom with a walk-in shower', es: 'Baño elegante con ducha a ras de suelo' },
  'gallery.alt.exterior': { en: 'Exterior view of the apartment complex', es: 'Vista exterior del complejo de apartamentos' },
  'gallery.alt.patio': { en: 'Outdoor patio, perfect for barbecues', es: 'Patio exterior con parrilla, perfecto para disfrutar al aire libre' },
  'gallery.alt.bedroom2': { en: 'Cozy second bedroom with twin beds', es: 'Acogedor segundo dormitorio con camas gemelas' },
  'gallery.alt.bedroom3': { en: 'Cozy second bedroom with twin beds', es: 'Acogedor segundo dormitorio con camas gemelas' },
  'gallery.alt.kitchen1': { en: 'Modern kitchen with appliances', es: 'Cocina moderna con electrodomésticos' },
  'gallery.alt.bathroom1': { en: 'Clean and modern bathroom', es: 'Baño limpio y moderno' },
  'gallery.alt.dormitorio': { en: 'Comfortable bedroom', es: 'Habitación cómoda' },
  'gallery.alt.cocina': { en: 'Kitchen with dining area', es: 'Cocina con área de comedor' },
  'gallery.alt.livingRoom': { en: 'Spacious living room with natural light', es: 'Sala de estar espaciosa con luz natural' },
  
  
  
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
  
  // Booking Payment Section
  'booking.payment.methods': { en: 'Accepted Payment Methods', es: 'Medios de Pago Habilitados' },
  'booking.payment.creditCard': { en: '💳 Credit Card', es: '💳 Tarjeta de crédito' },
  'booking.payment.bankTransfer': { en: '💸 Bank Transfer', es: '💸 Transferencia bancaria' },
  'booking.payment.cash': { en: '💵 Cash', es: '💵 Efectivo' },
  'booking.payment.information': { en: 'Information', es: 'Información' },
  'booking.payment.deposit': { en: 'Required deposit:', es: 'Seña requerida:' },
  'booking.payment.depositAmount': { en: '30% of total stay', es: '30% del total de la estadía' },
  'booking.payment.checkinTime': { en: 'Check-in:', es: 'Check-in:' },
  'booking.payment.checkinValue': { en: 'From 3:00 PM', es: 'A partir de las 15:00 hs' },
  'booking.payment.checkoutTime': { en: 'Check-out:', es: 'Check-out:' },
  'booking.payment.checkoutValue': { en: 'Until 11:00 AM', es: 'Hasta las 11:00 hs' },
  'booking.payment.discountInfo': { en: 'Discount:', es: 'Descuento:' },
  'booking.payment.discountValue': { en: '10% for stays of 4 nights or more', es: '10% en estadías de 4 noches o más' },
  'booking.confirmationMessage': { en: 'Booking request sent successfully! We will contact you to confirm availability and payment details.', es: '¡Solicitud de reserva enviada correctamente! Nos pondremos en contacto contigo para confirmar disponibilidad y detalles de pago.' },
  
  // Reviews Section
  'reviews.title': { en: 'Artin House Reviews', es: 'Valoraciones de Artin House' },
  'reviews.totalReviews': { en: 'reviews', es: 'valoraciones' },
  
  // Policies Page Subtitles
  'policies.booking.advanceTitle': { en: 'Advance Payment', es: 'Pago por Adelantado' },
  'policies.booking.minimumTitle': { en: 'Minimum Stay', es: 'Estadía Mínima' },
  'policies.booking.discountTitle': { en: 'Extended Stay Discount', es: 'Descuento por Estadía Prolongada' },
  
  // Footer
  'footer.subtitle': { en: "Your home away from home in the heart of Argentina's wine country.", es: 'Tu hogar lejos de casa en el corazón de la tierra del vino de Argentina.' },
  'footer.contactTitle': { en: 'Contact Us', es: 'Contáctanos' },
  'footer.followTitle': { en: 'Follow Us', es: 'Síguenos' },
  'footer.locationTitle': { en: 'Location', es: 'Ubicación' },
  'footer.copyright': { en: 'All rights reserved.', es: 'Todos los derechos reservados.' },

  // Contact
  'contact.title': { en: 'Get in Touch', es: 'Contáctanos' },
  'contact.subtitle': { en: 'Discover our oasis of tranquility in Mendoza and experience an unforgettable stay', es: 'Descubre nuestro oasis de tranquilidad en Mendoza y vive una estadía inolvidable' },
  'contact.formTitle': { en: 'Send us a Message', es: 'Envíanos un Mensaje' },
  'contact.nameLabel': { en: 'Full Name', es: 'Nombre Completo' },
  'contact.emailLabel': { en: 'Email Address', es: 'Dirección de Email' },
  'contact.phoneLabel': { en: 'Phone Number', es: 'Número de Teléfono' },
  'contact.apartmentLabel': { en: 'Interested in', es: 'Interesado en' },
  'contact.messageLabel': { en: 'Message', es: 'Mensaje' },
  'contact.sendButton': { en: 'Send Message', es: 'Enviar Mensaje' },
  'contact.locationTitle': { en: 'Our Location', es: 'Nuestra Ubicación' },
  'contact.successMsg': { en: 'Message sent successfully! We will contact you soon.', es: '¡Mensaje enviado exitosamente! Te contactaremos pronto.' },
  'contact.errorMsg': { en: 'Please fill in all required fields.', es: 'Por favor, completa todos los campos requeridos.' },
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
