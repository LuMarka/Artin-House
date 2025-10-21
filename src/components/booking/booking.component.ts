import { Component, ChangeDetectionStrategy, signal, computed, inject, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';

interface Day {
  date: Date;
  isCurrentMonth: boolean;
  isBooked: boolean;
  isPast: boolean;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent {
  private translationService = inject(TranslationService);
  
  // Input para preseleccionar apartamento
  apartmentInput = input<'Artin House I' | 'Artin House II'>();
  
  selectedApartment = signal<'Artin House I' | 'Artin House II'>('Artin House I');
  currentDate = signal(new Date());
  
  checkInDate = signal<Date | null>(null);
  checkOutDate = signal<Date | null>(null);
  guests = signal(2); // Default 2 guests

  // Maximum guests based on apartment
  maxGuests = computed(() => {
    return this.selectedApartment() === 'Artin House I' ? 5 : 2;
  });

  bookingStatus = signal<'idle' | 'booked' | 'error'>('idle');
  language = this.translationService.language;
  
  // Translated text signals
  t = {
    title: this.translationService.translate('booking.title'),
    subtitle: this.translationService.translate('booking.subtitle'),
    apartmentLabel: this.translationService.translate('booking.apartmentLabel'),
    checkinLabel: this.translationService.translate('booking.checkinLabel'),
    checkoutLabel: this.translationService.translate('booking.checkoutLabel'),
    guestLabel: this.translationService.translate('booking.guestLabel'),
    selectDate: this.translationService.translate('booking.selectDate'),
    bookButton: this.translationService.translate('booking.bookButton'),
    successMsg: this.translationService.translate('booking.successMsg'),
    errorMsg: this.translationService.translate('booking.errorMsg'),
    dollarRates: this.translationService.translate('booking.dollarRates'),
    contactWhatsApp: this.translationService.translate('booking.contactWhatsApp'),
    contactEmail: this.translationService.translate('booking.contactEmail'),
    contactForm: this.translationService.translate('booking.contactForm'),
    weekdays: {
      sun: this.translationService.translate('booking.weekdays.sun'),
      mon: this.translationService.translate('booking.weekdays.mon'),
      tue: this.translationService.translate('booking.weekdays.tue'),
      wed: this.translationService.translate('booking.weekdays.wed'),
      thu: this.translationService.translate('booking.weekdays.thu'),
      fri: this.translationService.translate('booking.weekdays.fri'),
      sat: this.translationService.translate('booking.weekdays.sat'),
    },
    payment: {
      methods: this.translationService.translate('booking.payment.methods'),
      creditCard: this.translationService.translate('booking.payment.creditCard'),
      debitCard: this.translationService.translate('booking.payment.debitCard'),
      bankTransfer: this.translationService.translate('booking.payment.bankTransfer'),
      cash: this.translationService.translate('booking.payment.cash'),
      information: this.translationService.translate('booking.payment.information'),
      deposit: this.translationService.translate('booking.payment.deposit'),
      depositAmount: this.translationService.translate('booking.payment.depositAmount'),
      checkinTime: this.translationService.translate('booking.payment.checkinTime'),
      checkinValue: this.translationService.translate('booking.payment.checkinValue'),
      checkoutTime: this.translationService.translate('booking.payment.checkoutTime'),
      checkoutValue: this.translationService.translate('booking.payment.checkoutValue'),
      discountInfo: this.translationService.translate('booking.payment.discountInfo'),
      discountValue: this.translationService.translate('booking.payment.discountValue'),
    }
  };

  // Hardcoded booked dates for demonstration
  private bookedDatesRaw = [
    new Date(2025, 6, 20), new Date(2025, 6, 21), new Date(2025, 6, 22),
    new Date(2025, 7, 5), new Date(2025, 7, 6)
  ];

  calendarGrid = computed(() => this.generateCalendar(this.currentDate()));
  monthYearDisplay = computed(() => this.currentDate().toLocaleString(this.language(), { month: 'long', year: 'numeric' }));

  constructor() {
    // Effect para establecer el apartamento cuando se pasa como input
    effect(() => {
      const apartment = this.apartmentInput();
      if (apartment) {
        this.selectedApartment.set(apartment);
        // Reset guests when apartment changes
        this.guests.set(apartment === 'Artin House I' ? 2 : 2);
      }
    });
  }
  
  numberOfNights = computed(() => {
    const checkIn = this.checkInDate();
    const checkOut = this.checkOutDate();
    if (checkIn && checkOut) {
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  });

  pricePerNight = computed(() => {
    const guestCount = this.guests();
    if (guestCount <= 2) return 65000;
    if (guestCount === 3) return 70000;
    return 75000; // 5+ guests
  });

  totalPrice = computed(() => {
    return this.numberOfNights() * this.pricePerNight();
  });

  // Agregar después de totalPrice computed
  hasDiscount = computed(() => this.numberOfNights() >= 4);

  discountedPrice = computed(() => {
    const total = this.totalPrice();
    return this.hasDiscount() ? total * 0.9 : total; // 10% descuento
  });

  savings = computed(() => {
    return this.hasDiscount() ? this.totalPrice() - this.discountedPrice() : 0;
  });

  isDateInRange(date: Date): boolean {
    const checkIn = this.checkInDate();
    const checkOut = this.checkOutDate();
    if (!checkIn || !checkOut) return false;
    return date > checkIn && date < checkOut;
  }

  isDateSelected(date: Date): boolean {
    const checkIn = this.checkInDate();
    const checkOut = this.checkOutDate();
    const sameDay = (d1: Date, d2: Date) => d1.toDateString() === d2.toDateString();
    return (checkIn && sameDay(date, checkIn)) || (checkOut && sameDay(date, checkOut)) || false;
  }
  
  isDateBooked(date: Date): boolean {
    return this.bookedDatesRaw.some(d => d.toDateString() === date.toDateString());
  }

  selectDate(day: Day): void {
    if (!day.isCurrentMonth || day.isBooked) return;

    const clickedDate = day.date;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Resetear horas para comparación solo de fechas
    
    // Prevenir selección de fechas pasadas
    if (clickedDate < today) return;

    const checkIn = this.checkInDate();
    const checkOut = this.checkOutDate();

    if (!checkIn || (checkIn && checkOut)) {
      this.checkInDate.set(clickedDate);
      this.checkOutDate.set(null);
    } else if (checkIn && !checkOut) {
      if (clickedDate > checkIn) {
        this.checkOutDate.set(clickedDate);
      } else {
        this.checkInDate.set(clickedDate);
      }
    }
    this.bookingStatus.set('idle');
  }

  changeMonth(offset: number): void {
    this.currentDate.update(date => {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
  }

  confirmBooking(): void {
    if (this.checkInDate() && this.checkOutDate()) {
      this.sendBookingRequest();
    } else {
      this.bookingStatus.set('error');
    }
  }

  private sendBookingRequest(): void {
    const checkIn = this.checkInDate()!;
    const checkOut = this.checkOutDate()!;
    const apartment = this.selectedApartment();
    const nights = this.numberOfNights();
    const guests = this.guests();
    
    // Usar el precio calculado correctamente
    const totalPrice = this.hasDiscount() ? this.discountedPrice() : this.totalPrice();
    const pricePerNight = this.pricePerNight();
    
    // Crear la reserva internamente (simulación de base de datos)
    this.addBookingToSystem(checkIn, checkOut, apartment);

    // Preparar email de contacto con precios correctos
    const subject = encodeURIComponent(`Solicitud de reserva - ${apartment}`);
    
    let priceDetails = `💰 Precio por noche: $${pricePerNight.toLocaleString('es-AR')} ARS
💰 Subtotal (${nights} noches): $${this.totalPrice().toLocaleString('es-AR')} ARS`;

    // Agregar información de descuento si aplica
    if (this.hasDiscount()) {
      priceDetails += `
🎉 Descuento 10% (4+ noches): -$${this.savings().toLocaleString('es-AR')} ARS
💰 Total Final: $${this.discountedPrice().toLocaleString('es-AR')} ARS`;
    }

    const body = encodeURIComponent(`
¡Hola!

Deseo realizar una reserva con los siguientes detalles:

🏠 Apartamento: ${apartment}
👥 Cantidad de huéspedes: ${guests}
📅 Fecha de entrada: ${checkIn.toLocaleDateString('es-AR')}
📅 Fecha de salida: ${checkOut.toLocaleDateString('es-AR')}
🌙 Número de noches: ${nights}

${priceDetails}

Por favor, confirmen disponibilidad y envíenme los detalles para proceder con el pago de la seña (20%).

¡Gracias!
    `);

    // Abrir cliente de email
    window.open(`mailto:artinhousemza@gmail.com?subject=${subject}&body=${body}`, '_blank');

    this.bookingStatus.set('booked');
  }

  incrementGuests(): void {
    if (this.guests() < this.maxGuests()) {
      this.guests.update(count => count + 1);
    }
  }

  decrementGuests(): void {
    if (this.guests() > 1) {
      this.guests.update(count => count - 1);
    }
  }

  // Reset guests when changing apartment
  onApartmentChange(): void {
    const max = this.maxGuests();
    if (this.guests() > max) {
      this.guests.set(max);
    }
  }

  private addBookingToSystem(checkIn: Date, checkOut: Date, apartment: string): void {
    // Agregar fechas reservadas al sistema
    const currentDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    
    while (currentDate < endDate) {
      this.bookedDatesRaw.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  private formatDateForCalendar(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }

  private generateCalendar(date: Date): Day[][] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dates: Day[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Para comparación de fechas sin horas

    // Days from previous month
    for (let i = firstDayOfMonth; i > 0; i--) {
      const prevMonthDate = new Date(year, month, 1 - i);
      dates.push({ 
        date: prevMonthDate, 
        isCurrentMonth: false, 
        isBooked: this.isDateBooked(prevMonthDate),
        isPast: prevMonthDate < today
      });
    }

    // Days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      dates.push({ 
        date: currentDate, 
        isCurrentMonth: true, 
        isBooked: this.isDateBooked(currentDate),
        isPast: currentDate < today
      });
    }

    // Days from next month
    const remaining = 42 - dates.length; // 6 weeks * 7 days
    for (let i = 1; i <= remaining; i++) {
      const nextMonthDate = new Date(year, month + 1, i);
      dates.push({ 
        date: nextMonthDate, 
        isCurrentMonth: false, 
        isBooked: this.isDateBooked(nextMonthDate),
        isPast: nextMonthDate < today
      });
    }
    
    // Group into weeks
    const weeks: Day[][] = [];
    for (let i = 0; i < dates.length; i += 7) {
      weeks.push(dates.slice(i, i + 7));
    }

    return weeks;
  }

  // Agregar después de los otros métodos
  canBook = computed(() => {
    return this.checkInDate() && 
           this.checkOutDate() && 
           this.selectedApartment() && 
           this.guests() >= 1;
  });

  book(): void {
    if (!this.canBook()) {
      return;
    }
    
    this.sendBookingRequest();
  }

  navigateToContact(event: Event): void {
    event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
    
    // Intentar encontrar el elemento de contacto
    const contactElement = document.getElementById('contact') || 
                          document.querySelector('app-contact');
    
    if (contactElement) {
      // Si existe, hacer scroll suave
      contactElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    } else {
      // Si no existe, navegar a la página de contacto
      window.open('/contact', '_self');
    }
  }
}