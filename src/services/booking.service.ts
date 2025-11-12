import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

export interface Booking {
  id: string;
  apartment: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: Date;
  cancelledAt?: Date;
}

export interface ApartmentPricing {
  apartment: string;
  basePrice: number;
  pricePerGuest: number;
  maxGuests: number;
  customPricing?: {
    [guests: number]: number; // Precios específicos por número de huéspedes
  };
  seasonalRates?: {
    startDate: Date;
    endDate: Date;
    multiplier: number; // 1.2 = 20% más caro
    name?: string; // Nombre descriptivo de la temporada
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  // Señales reactivas para manejar estado
  private bookings = signal<Booking[]>([]);
  private apartmentPricing = signal<ApartmentPricing[]>([]);
  
  // Subject para notificar cambios en las reservas
  private bookingsUpdated = new Subject<void>();
  public bookingsUpdated$ = this.bookingsUpdated.asObservable();

  constructor() {
    this.loadBookingsFromStorage();
    this.loadPricingFromStorage();
  }

  // Métodos públicos para acceder a las señales
  getBookings() {
    return this.bookings.asReadonly();
  }

  getApartmentPricing() {
    return this.apartmentPricing.asReadonly();
  }

  // Verificar si una fecha está reservada para un apartamento
  isDateBooked(date: Date, apartment: string): boolean {
    const bookings = this.bookings();
    return bookings.some(booking => 
      booking.apartment === apartment &&
      booking.status === 'confirmed' &&
      date >= booking.checkIn &&
      date < booking.checkOut
    );
  }

  // Verificar si un rango de fechas está disponible
  isRangeAvailable(checkIn: Date, checkOut: Date, apartment: string): boolean {
    const bookings = this.bookings();
    return !bookings.some(booking => 
      booking.apartment === apartment &&
      booking.status === 'confirmed' &&
      ((checkIn >= booking.checkIn && checkIn < booking.checkOut) ||
       (checkOut > booking.checkIn && checkOut <= booking.checkOut) ||
       (checkIn <= booking.checkIn && checkOut >= booking.checkOut))
    );
  }

  // Calcular precio por noche para un apartamento específico
  calculatePricePerNight(apartment: string, guests: number, date: Date): number {
    const pricing = this.apartmentPricing().find(p => p.apartment === apartment);
    
    if (!pricing) {
      // Fallback con lógica personalizada si no hay datos guardados
      if (apartment === 'Artin House I') {
        return this.calculateArtinHouseIPrice(guests);
      } else if (apartment === 'Artin House II') {
        return 50000 + (0 * Math.max(0, guests - 1));
      }
      return 50000;
    }

    let totalPrice: number;
    
    // Lógica personalizada para Artin House I
    if (apartment === 'Artin House I') {
      totalPrice = this.calculateArtinHouseIPrice(guests);
    } else {
      // Lógica estándar para otros apartamentos
      let basePrice = pricing.basePrice;
      let guestPrice = pricing.pricePerGuest * Math.max(0, guests - 1);
      totalPrice = basePrice + guestPrice;
    }

    // Aplicar tarifas estacionales
    const seasonalRate = pricing.seasonalRates?.find(rate => 
      date >= rate.startDate && date <= rate.endDate
    );

    if (seasonalRate) {
      totalPrice *= seasonalRate.multiplier;
    }

    return Math.round(totalPrice);
  }

  // Calcular precio total para un rango de fechas (día por día para considerar temporadas)
  calculateTotalPriceForStay(apartment: string, guests: number, checkIn: Date, checkOut: Date): number {
    let totalPrice = 0;
    const currentDate = new Date(checkIn);
    
    // Iterar día por día hasta la fecha de salida (sin incluirla)
    while (currentDate < checkOut) {
      const dailyPrice = this.calculatePricePerNight(apartment, guests, new Date(currentDate));
      totalPrice += dailyPrice;
      
      // Avanzar al siguiente día
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return Math.round(totalPrice);
  }

  // Obtener desglose detallado por temporadas
  getPriceBreakdown(apartment: string, guests: number, checkIn: Date, checkOut: Date): {
    nights: number;
    seasons: Array<{
      name: string;
      nights: number;
      pricePerNight: number;
      totalPrice: number;
      isHighSeason: boolean;
    }>;
    totalPrice: number;
  } {
    const breakdown = {
      nights: 0,
      seasons: [] as any[],
      totalPrice: 0
    };

    const currentDate = new Date(checkIn);
    const seasonsMap = new Map();

    // Agrupar noches por temporada
    while (currentDate < checkOut) {
      const dailyPrice = this.calculatePricePerNight(apartment, guests, new Date(currentDate));
      const pricing = this.apartmentPricing().find(p => p.apartment === apartment);
      
      let seasonName = 'Temporada Baja';
      let isHighSeason = false;
      
      if (pricing?.seasonalRates) {
        const seasonalRate = pricing.seasonalRates.find(rate => 
          currentDate >= rate.startDate && currentDate <= rate.endDate
        );
        if (seasonalRate) {
          seasonName = seasonalRate.name || 'Temporada Alta';
          isHighSeason = seasonalRate.multiplier > 1;
        }
      }

      if (!seasonsMap.has(seasonName)) {
        seasonsMap.set(seasonName, {
          name: seasonName,
          nights: 0,
          pricePerNight: 0, // Se calculará como promedio al final
          totalPrice: 0,
          isHighSeason
        });
      }

      const season = seasonsMap.get(seasonName);
      season.nights++;
      season.totalPrice += dailyPrice;
      breakdown.nights++;
      breakdown.totalPrice += dailyPrice;

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Calcular precio promedio por noche para cada temporada
    breakdown.seasons = Array.from(seasonsMap.values()).map(season => ({
      ...season,
      pricePerNight: Math.round(season.totalPrice / season.nights)
    }));
    breakdown.totalPrice = Math.round(breakdown.totalPrice);
    
    return breakdown;
  }

  // Lógica personalizada de precios para Artin House I
  private calculateArtinHouseIPrice(guests: number): number {
    // Primero buscar si hay precios personalizados guardados
    const pricing = this.apartmentPricing().find(p => p.apartment === 'Artin House I');
    
    if (pricing?.customPricing && pricing.customPricing[guests]) {
      return pricing.customPricing[guests];
    }
    
    // Fallback a lógica por defecto si no hay precios personalizados
    const basePrice = pricing?.basePrice || 75000;
    const extraPrice = pricing?.pricePerGuest || 0;
    
    if (guests <= 2) {
      return basePrice;
    } else {
      return basePrice + (extraPrice * (guests - 2));
    }
  }

  // Crear una nueva reserva
  createBooking(checkIn: Date, checkOut: Date, apartment: string, guests: number): string {
    if (!this.isRangeAvailable(checkIn, checkOut, apartment)) {
      throw new Error('Las fechas seleccionadas no están disponibles');
    }

    const booking: Booking = {
      id: this.generateBookingId(),
      apartment,
      checkIn,
      checkOut,
      guests,
      status: 'confirmed',
      createdAt: new Date()
    };

    this.bookings.update(bookings => [...bookings, booking]);
    this.saveBookingsToStorage();
    this.bookingsUpdated.next(); // Notificar cambio
    return booking.id;
  }

  // Obtener máximo de huéspedes para un apartamento
  getMaxGuests(apartment: string): number {
    const pricing = this.apartmentPricing().find(p => p.apartment === apartment);
    return pricing?.maxGuests || 4;
  }

  // Métodos privados
  private generateBookingId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private saveBookingsToStorage(): void {
    const bookings = this.bookings().map(booking => ({
      ...booking,
      checkIn: booking.checkIn.toISOString(),
      checkOut: booking.checkOut.toISOString(),
      createdAt: booking.createdAt.toISOString()
    }));
    localStorage.setItem('artin-house-bookings', JSON.stringify(bookings));
  }

  private loadBookingsFromStorage(): void {
    const stored = localStorage.getItem('artin-house-bookings');
    if (stored) {
      try {
        const bookings = JSON.parse(stored).map((booking: any) => ({
          ...booking,
          checkIn: new Date(booking.checkIn),
          checkOut: new Date(booking.checkOut),
          createdAt: new Date(booking.createdAt)
        }));
        this.bookings.set(bookings);
      } catch (error) {
        console.error('Error loading bookings from storage:', error);
        this.bookings.set([]);
      }
    }
  }

  private savePricingToStorage(): void {
    try {
      const pricing = this.apartmentPricing().map(p => ({
        ...p,
        seasonalRates: p.seasonalRates?.map(rate => ({
          ...rate,
          startDate: rate.startDate.toISOString(),
          endDate: rate.endDate.toISOString()
        }))
      }));
      
      const dataToSave = {
        version: '2.0', // Versión actualizada para nuevos precios por defecto
        timestamp: new Date().toISOString(),
        checksum: this.generateChecksum(pricing), // Checksum para detectar corrupción
        data: pricing
      };
      
      localStorage.setItem('artin-house-pricing', JSON.stringify(dataToSave));
      localStorage.setItem('artin-house-pricing-backup', JSON.stringify(dataToSave)); // Backup
      
      // Verificar que se guardó correctamente
      const verification = localStorage.getItem('artin-house-pricing');
      if (!verification) {
        throw new Error('No se pudo guardar en localStorage');
      }
      
      // Verificar integridad
      const parsed = JSON.parse(verification);
      if (parsed.checksum !== this.generateChecksum(pricing)) {
        throw new Error('Error de integridad al guardar datos');
      }
      
      console.log('✅ Precios guardados correctamente con integridad verificada');
      
    } catch (error) {
      console.error('❌ Error saving pricing to localStorage:', error);
      alert('⚠️ Error crítico al guardar los precios. Los cambios pueden perderse al recargar la página.');
      
      // Intentar guardar en sessionStorage como fallback
      try {
        sessionStorage.setItem('artin-house-pricing-emergency', JSON.stringify(this.apartmentPricing()));
        console.log('💾 Datos guardados en sessionStorage como respaldo de emergencia');
      } catch (sessionError) {
        console.error('❌ También falló sessionStorage:', sessionError);
      }
    }
  }

  private loadPricingFromStorage(): void {
    const stored = localStorage.getItem('artin-house-pricing');
    const backup = localStorage.getItem('artin-house-pricing-backup');
    
    if (stored) {
      try {
        const storedData = JSON.parse(stored);
        
        // Verificar integridad si hay checksum
        if (storedData.checksum && storedData.data) {
          const currentChecksum = this.generateChecksum(storedData.data);
          if (currentChecksum !== storedData.checksum) {
            console.warn('⚠️ Detectada corrupción en datos principales, intentando backup...');
            throw new Error('Checksum mismatch - datos corruptos');
          }
        }
        
        // Manejar formato antiguo y nuevo
        let pricingData;
        if (Array.isArray(storedData)) {
          // Formato antiguo - array directo
          pricingData = storedData;
          console.log('📦 Cargando formato antiguo, migrando...');
        } else if (storedData.data) {
          // Formato nuevo - con metadata
          pricingData = storedData.data;
          console.log(`✅ Precios v${storedData.version} cargados desde:`, storedData.timestamp);
        } else {
          throw new Error('Formato de datos no reconocido');
        }
        
        const pricing = pricingData.map((p: any) => ({
          ...p,
          seasonalRates: p.seasonalRates?.map((rate: any) => ({
            ...rate,
            startDate: new Date(rate.startDate),
            endDate: new Date(rate.endDate)
          }))
        }));
        
        // Validar que los precios tienen sentido
        this.validatePricingData(pricing);
        
        this.apartmentPricing.set(pricing);
        console.log('✅ Precios validados y cargados correctamente');
        
        // Si era formato antiguo, guardar en nuevo formato
        if (Array.isArray(storedData)) {
          console.log('🔄 Migrando a nuevo formato...');
          this.savePricingToStorage();
        }
        
      } catch (error) {
        console.error('❌ Error loading pricing from main storage:', error);
        
        // Intentar cargar desde backup
        if (backup && backup !== stored) {
          console.log('🔄 Intentando cargar desde backup...');
          try {
            const backupData = JSON.parse(backup);
            if (backupData.data) {
              const pricing = backupData.data.map((p: any) => ({
                ...p,
                seasonalRates: p.seasonalRates?.map((rate: any) => ({
                  ...rate,
                  startDate: new Date(rate.startDate),
                  endDate: new Date(rate.endDate)
                }))
              }));
              
              this.validatePricingData(pricing);
              this.apartmentPricing.set(pricing);
              console.log('✅ Datos restaurados desde backup exitosamente');
              
              // Restaurar datos principales desde backup
              this.savePricingToStorage();
              return;
            }
          } catch (backupError) {
            console.error('❌ También falló el backup:', backupError);
          }
        }
        
        console.log('🔄 Inicializando precios por defecto...');
        this.initializeDefaultPricing();
      }
    } else {
      console.log('📝 No hay precios guardados, usando valores por defecto');
      this.initializeDefaultPricing();
    }
  }
  
  private generateChecksum(data: any): string {
    // Simple checksum basado en JSON.stringify
    const str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
  }
  
  private validatePricingData(pricing: any[]): void {
    for (const p of pricing) {
      if (!p.apartment || typeof p.basePrice !== 'number' || p.basePrice < 0) {
        throw new Error(`Datos inválidos para apartamento: ${p.apartment}`);
      }
      
      if (p.seasonalRates) {
        for (const rate of p.seasonalRates) {
          if (!rate.startDate || !rate.endDate || isNaN(Date.parse(rate.startDate))) {
            throw new Error(`Fecha inválida en temporada: ${JSON.stringify(rate)}`);
          }
        }
      }
    }
  }

  private initializeDefaultPricing(): void {
    const defaultPricing: ApartmentPricing[] = [
      {
        apartment: 'Artin House I',
        basePrice: 75000, // Precio fijo para cualquier cantidad de huéspedes (1-5)
        pricePerGuest: 0, // Sin costo adicional por huésped adicional
        maxGuests: 5,
        seasonalRates: [
          {
            startDate: new Date('2025-12-01'),
            endDate: new Date('2026-03-31'),
            multiplier: 1.2667, // 95000/75000 = 1.2667 (para llegar a $95,000)
            name: 'Temporada Alta Verano 2025-2026'
          }
        ]
      },
      {
        apartment: 'Artin House II',
        basePrice: 50000, // Para 1-2 huéspedes (máximo permitido)
        pricePerGuest: 0, // Sin costo adicional (máx 2 personas)
        maxGuests: 2,
        seasonalRates: [
          {
            startDate: new Date('2025-12-01'),
            endDate: new Date('2026-03-31'),
            multiplier: 1.3333, // 60000/45000 = 1.3333 (para llegar a $60,000)
            name: 'Temporada Alta Verano 2025-2026'
          }
        ]
      }
    ];
    this.apartmentPricing.set(defaultPricing);
    this.savePricingToStorage(); // Guardar los precios por defecto
  }

  // Método para administradores: actualizar precios
  updateApartmentPricing(apartment: string, newPricing: Partial<ApartmentPricing>): void {
    this.apartmentPricing.update(pricing => 
      pricing.map(p => 
        p.apartment === apartment 
          ? { ...p, ...newPricing, apartment }
          : p
      )
    );
    this.savePricingToStorage(); // Guardar cambios en localStorage
  }

  // Método especial para actualizar precios de Artin House I
  updateArtinISpecialPricing(basePrice: number, extraPrice: number): void {
    this.apartmentPricing.update(pricing => 
      pricing.map(p => 
        p.apartment === 'Artin House I' 
          ? { ...p, basePrice, pricePerGuest: extraPrice }
          : p
      )
    );
    this.savePricingToStorage();
  }

  // Método para establecer precios personalizados por huésped
  updateArtinICustomPricing(customPricing: { [guests: number]: number }): void {
    this.apartmentPricing.update(pricing => 
      pricing.map(p => 
        p.apartment === 'Artin House I' 
          ? { ...p, customPricing }
          : p
      )
    );
    this.savePricingToStorage();
  }

  // Obtener precios personalizados actuales de Artin House I
  getArtinICustomPricing(): { [guests: number]: number } | undefined {
    const pricing = this.apartmentPricing().find(p => p.apartment === 'Artin House I');
    return pricing?.customPricing;
  }

  // Método para administradores: cancelar reserva
  cancelBooking(bookingId: string): boolean {
    const bookingExists = this.bookings().some(b => b.id === bookingId);
    if (!bookingExists) {
      return false;
    }

    this.bookings.update(bookings => 
      bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled', cancelledAt: new Date() }
          : booking
      )
    );
    this.saveBookingsToStorage();
    this.bookingsUpdated.next(); // Notificar cambio
    return true;
  }

  // Reactivar una reserva cancelada
  reactivateBooking(bookingId: string): boolean {
    const booking = this.bookings().find(b => b.id === bookingId);
    if (!booking || booking.status !== 'cancelled') {
      return false;
    }

    // Verificar si las fechas siguen disponibles
    if (!this.isRangeAvailable(booking.checkIn, booking.checkOut, booking.apartment)) {
      return false;
    }

    this.bookings.update(bookings => 
      bookings.map(b => 
        b.id === bookingId 
          ? { ...b, status: 'confirmed', cancelledAt: undefined }
          : b
      )
    );
    this.saveBookingsToStorage();
    this.bookingsUpdated.next(); // Notificar cambio
    return true;
  }

  // Eliminar permanentemente una reserva cancelada
  deleteBooking(bookingId: string): boolean {
    const booking = this.bookings().find(b => b.id === bookingId);
    if (!booking) {
      return false;
    }

    this.bookings.update(bookings => 
      bookings.filter(b => b.id !== bookingId)
    );
    this.saveBookingsToStorage();
    this.bookingsUpdated.next(); // Notificar cambio
    return true;
  }

  // Obtener todas las reservas para un apartamento específico
  getBookingsForApartment(apartment: string): Booking[] {
    return this.bookings().filter(booking => 
      booking.apartment === apartment && booking.status === 'confirmed'
    );
  }

  // Verificar si hay temporada alta
  isHighSeason(date: Date, apartment: string): boolean {
    const pricing = this.apartmentPricing().find(p => p.apartment === apartment);
    if (!pricing?.seasonalRates) return false;

    return pricing.seasonalRates.some(rate => 
      date >= rate.startDate && date <= rate.endDate
    );
  }

  // Métodos para gestión de temporadas
  addSeasonalRate(apartment: string, startDate: Date, endDate: Date, multiplier: number, name: string): void {
    this.apartmentPricing.update(pricings => 
      pricings.map(pricing => {
        if (pricing.apartment === apartment) {
          const newRate = {
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            multiplier,
            name
          };
          
          // Inicializar seasonalRates si no existe
          if (!pricing.seasonalRates) {
            pricing.seasonalRates = [];
          }
          
          // Agregar nueva temporada
          pricing.seasonalRates.push(newRate);
          
          // Ordenar por fecha de inicio
          pricing.seasonalRates.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
        }
        return pricing;
      })
    );
    this.savePricingToStorage();
  }

  removeSeasonalRate(apartment: string, startDate: Date): void {
    this.apartmentPricing.update(pricings => 
      pricings.map(pricing => {
        if (pricing.apartment === apartment && pricing.seasonalRates) {
          pricing.seasonalRates = pricing.seasonalRates.filter(rate => 
            rate.startDate.getTime() !== startDate.getTime()
          );
        }
        return pricing;
      })
    );
    this.savePricingToStorage();
  }

  // Método para resetear precios a valores por defecto
  resetPricingToDefaults(): void {
    this.initializeDefaultPricing();
  }

  // Método para limpiar todos los datos (bookings y precios)
  clearAllData(): void {
    this.bookings.set([]);
    this.initializeDefaultPricing();
    localStorage.removeItem('artin-house-bookings');
    localStorage.removeItem('artin-house-pricing');
  }
}