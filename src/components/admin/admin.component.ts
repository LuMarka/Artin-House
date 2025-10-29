import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService, Booking } from '../../services/booking.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  private bookingService = inject(BookingService);

  selectedApartment = 'Artin House II'; // Solo para apartamentos con lógica estándar
  newBasePrice = 0;
  newPricePerGuest = 0;
  
  // Propiedades para Artin House I (lógica especial) - Valores iniciales que se sobreescriben desde el servicio
  artinIBasePrice = 0;
  artinIExtraPrice = 0;
  
  // Precios personalizados por huésped - Se cargan desde el servicio pero tienen valores por defecto para mostrar
  customPrices: { [guests: number]: number } = {
    1: 75000,
    2: 75000,
    3: 75000,
    4: 75000,
    5: 75000
  };
  useCustomPricing = true; // Por defecto mostrar los inputs individuales

  // Propiedades para gestión de temporadas
  selectedSeasonApartment = 'Artin House I';
  seasonStartDate = '';
  seasonEndDate = '';
  seasonMultiplier = 1.276; // 27.6% más caro por defecto
  seasonName = '';

  // Get the signals
  bookings = this.bookingService.getBookings();
  apartmentPricing = this.bookingService.getApartmentPricing();

  constructor() {
    // Cargar todos los valores desde el servicio
    this.loadValuesFromService();
  }

  private loadValuesFromService(): void {
    // Cargar precios personalizados de Artin House I si existen
    const customPricing = this.bookingService.getArtinICustomPricing();
    if (customPricing && Object.keys(customPricing).length > 0) {
      this.customPrices = { ...customPricing };
      this.useCustomPricing = true;
    }
    
    // Cargar precios estándar de Artin House I desde el servicio
    const artinIPricing = this.apartmentPricing().find(p => p.apartment === 'Artin House I');
    if (artinIPricing) {
      this.artinIBasePrice = artinIPricing.basePrice;
      this.artinIExtraPrice = artinIPricing.pricePerGuest;
    }
  }

  confirmedBookings = computed(() => {
    return this.bookings().filter((b: Booking) => b.status === 'confirmed');
  });

  getBookingsForApartment(apartment: string): Booking[] {
    return this.bookings().filter((b: Booking) => b.apartment === apartment && b.status === 'confirmed');
  }

  updatePricing(): void {
    if (this.newBasePrice <= 0 || this.newPricePerGuest < 0) {
      alert('Por favor, ingresa valores válidos para los precios.');
      return;
    }

    this.bookingService.updateApartmentPricing(this.selectedApartment, {
      basePrice: this.newBasePrice,
      pricePerGuest: this.newPricePerGuest
    });

    alert(`Precios actualizados para ${this.selectedApartment}`);
    
    // Reset form
    this.newBasePrice = 0;
    this.newPricePerGuest = 0;
  }

  cancelBooking(bookingId: string): void {
    if (confirm('¿Estás seguro de cancelar esta reserva? Las fechas quedarán disponibles nuevamente.')) {
      const success = this.bookingService.cancelBooking(bookingId);
      if (success) {
        alert('Reserva cancelada exitosamente. Las fechas están nuevamente disponibles.');
      } else {
        alert('Error al cancelar la reserva.');
      }
    }
  }

  reactivateBooking(bookingId: string): void {
    if (confirm('¿Deseas reactivar esta reserva? Las fechas deben estar disponibles.')) {
      const success = this.bookingService.reactivateBooking(bookingId);
      if (success) {
        alert('Reserva reactivada exitosamente.');
      } else {
        alert('No se puede reactivar la reserva. Las fechas ya no están disponibles.');
      }
    }
  }

  deleteBooking(bookingId: string): void {
    if (confirm('¿Estás seguro de eliminar permanentemente esta reserva? Esta acción no se puede deshacer.')) {
      const success = this.bookingService.deleteBooking(bookingId);
      if (success) {
        alert('Reserva eliminada permanentemente.');
      } else {
        alert('Error al eliminar la reserva.');
      }
    }
  }

  // Métodos auxiliares para la vista de precios actuales
  hasCustomPricing(pricing: any): boolean {
    return pricing.customPricing && Object.keys(pricing.customPricing).length > 0;
  }

  getCustomPrice(pricing: any, guests: number): number {
    if (this.hasCustomPricing(pricing) && pricing.customPricing[guests]) {
      return pricing.customPricing[guests];
    }
    // Fallback al cálculo estándar
    return pricing.basePrice + (guests - 1) * pricing.pricePerGuest;
  }

  resetPricing(): void {
    if (confirm('¿Estás seguro de resetear todos los precios a los valores por defecto? Se perderán las personalizaciones.')) {
      this.bookingService.resetPricingToDefaults();
      alert('Precios restaurados a valores por defecto.');
      // Reset form
      this.newBasePrice = 0;
      this.newPricePerGuest = 0;
    }
  }

  clearAllData(): void {
    if (confirm('⚠️ ATENCIÓN: Esto eliminará TODAS las reservas y restaurará precios por defecto. ¿Estás completamente seguro?')) {
      if (confirm('Esta acción NO se puede deshacer. ¿Continuar?')) {
        this.bookingService.clearAllData();
        alert('Todos los datos han sido eliminados y los precios restaurados.');
        // Reset form
        this.newBasePrice = 0;
        this.newPricePerGuest = 0;
      }
    }
  }

  // Métodos para gestión especial de Artin House I
  updateArtinISpecialPricing(): void {
    if (this.useCustomPricing) {
      // Usar precios personalizados
      this.bookingService.updateArtinICustomPricing(this.customPrices);
      alert('Precios personalizados actualizados para Artin House I');
    } else {
      // Usar lógica estándar
      if (this.artinIBasePrice <= 0 || this.artinIExtraPrice < 0) {
        alert('Por favor, ingresa valores válidos para Artin House I.');
        return;
      }
      this.bookingService.updateArtinISpecialPricing(this.artinIBasePrice, this.artinIExtraPrice);
      // Limpiar precios personalizados
      this.bookingService.updateArtinICustomPricing({});
      alert('Precios estándar actualizados para Artin House I');
    }
  }

  getArtinIPreview(guests: number): number {
    if (this.useCustomPricing) {
      return this.customPrices[guests] || this.getDefaultPriceFromService(guests);
    } else {
      // Usar valores del formulario o fallback al servicio
      const basePrice = this.artinIBasePrice || this.getServiceBasePrice();
      const extraPrice = this.artinIExtraPrice || this.getServiceExtraPrice();
      
      if (guests <= 2) {
        return basePrice;
      } else {
        return basePrice + (extraPrice * (guests - 2));
      }
    }
  }

  private getDefaultPriceFromService(guests: number): number {
    // Usar el servicio para calcular precio por defecto
    return this.bookingService.calculatePricePerNight('Artin House I', guests, new Date());
  }

  private getServiceBasePrice(): number {
    const pricing = this.apartmentPricing().find(p => p.apartment === 'Artin House I');
    return pricing?.basePrice || 75000;
  }

  private getServiceExtraPrice(): number {
    const pricing = this.apartmentPricing().find(p => p.apartment === 'Artin House I');
    return pricing?.pricePerGuest || 0;
  }

  togglePricingMode(): void {
    this.useCustomPricing = !this.useCustomPricing;
  }

  // Métodos para gestión de temporadas
  addSeasonalRate(): void {
    if (!this.seasonStartDate || !this.seasonEndDate || !this.seasonName) {
      alert('Por favor, completa todos los campos de la temporada.');
      return;
    }

    if (this.seasonMultiplier < 0.1 || this.seasonMultiplier > 5) {
      alert('El multiplicador debe estar entre 0.1 y 5.0');
      return;
    }

    // Crear fechas correctamente para evitar problemas de zona horaria
    const [startYear, startMonth, startDay] = this.seasonStartDate.split('-').map(Number);
    const [endYear, endMonth, endDay] = this.seasonEndDate.split('-').map(Number);
    
    const startDate = new Date(startYear, startMonth - 1, startDay); // Mes - 1 porque JavaScript usa 0-11
    const endDate = new Date(endYear, endMonth - 1, endDay);

    if (startDate >= endDate) {
      alert('La fecha de inicio debe ser anterior a la fecha de fin.');
      return;
    }

    this.bookingService.addSeasonalRate(
      this.selectedSeasonApartment,
      startDate,
      endDate,
      this.seasonMultiplier,
      this.seasonName
    );

    alert(`Temporada "${this.seasonName}" agregada exitosamente.`);
    this.clearSeasonForm();
  }

  removeSeasonalRate(apartment: string, startDate: Date): void {
    if (confirm('¿Estás seguro de eliminar esta temporada?')) {
      this.bookingService.removeSeasonalRate(apartment, startDate);
      alert('Temporada eliminada exitosamente.');
    }
  }

  clearSeasonForm(): void {
    this.seasonStartDate = '';
    this.seasonEndDate = '';
    this.seasonMultiplier = 1.276;
    this.seasonName = '';
  }

  getSeasonalRates(apartment: string) {
    const pricing = this.apartmentPricing().find(p => p.apartment === apartment);
    return pricing?.seasonalRates || [];
  }

  formatDate(date: Date): string {
    // Asegurar que la fecha se muestre en zona horaria local
    return new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'America/Argentina/Buenos_Aires'
    }).format(date);
  }

  calculateSeasonalPrice(basePrice: number, multiplier: number): number {
    return Math.round(basePrice * multiplier);
  }
}