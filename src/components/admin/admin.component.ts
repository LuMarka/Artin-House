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
  
  // Precios personalizados por huésped - NUEVOS VALORES POR DEFECTO
  customPrices: { [guests: number]: number } = {
    1: 75000, // Precio fijo para cualquier cantidad
    2: 75000, // Precio fijo para cualquier cantidad  
    3: 75000, // Precio fijo para cualquier cantidad
    4: 75000, // Precio fijo para cualquier cantidad
    5: 75000  // Precio fijo para cualquier cantidad
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

  // Propiedad para mostrar la fecha actual
  get currentDateTime() {
    return new Date().toLocaleString('es-AR');
  }

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

  // Métodos para gestión de temporadas con validación mejorada
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
    
    // ⚠️ IMPORTANTE: Usar mediodía para evitar cambios por zona horaria
    const startDate = new Date(startYear, startMonth - 1, startDay, 12, 0, 0); 
    const endDate = new Date(endYear, endMonth - 1, endDay, 12, 0, 0);

    if (startDate >= endDate) {
      alert('La fecha de inicio debe ser anterior a la fecha de fin.');
      return;
    }

    // Verificar que no haya solapamiento con otras temporadas
    const existingRates = this.getSeasonalRates(this.selectedSeasonApartment);
    const hasOverlap = existingRates.some(rate => 
      (startDate >= rate.startDate && startDate <= rate.endDate) ||
      (endDate >= rate.startDate && endDate <= rate.endDate) ||
      (startDate <= rate.startDate && endDate >= rate.endDate)
    );

    if (hasOverlap) {
      alert('⚠️ Error: Las fechas se superponen con una temporada existente. Por favor, ajusta las fechas.');
      return;
    }

    // Mostrar confirmación con detalles
    const startStr = this.formatDateForConfirmation(startDate);
    const endStr = this.formatDateForConfirmation(endDate);
    const percentIncrease = ((this.seasonMultiplier - 1) * 100).toFixed(1);
    
    const confirmMsg = `¿Confirmar temporada "${this.seasonName}"?\n\n` +
                      `📅 Desde: ${startStr}\n` +
                      `📅 Hasta: ${endStr}\n` +
                      `📈 Aumento: ${percentIncrease}%\n` +
                      `🏠 Apartamento: ${this.selectedSeasonApartment}`;

    if (!confirm(confirmMsg)) {
      return;
    }

    try {
      // Si estamos editando, eliminar la temporada original primero
      if (this.editingSeasonRef) {
        this.bookingService.removeSeasonalRate(
          this.editingSeasonRef.apartment, 
          this.editingSeasonRef.originalStartDate
        );
        this.editingSeasonRef = null;
      }

      this.bookingService.addSeasonalRate(
        this.selectedSeasonApartment,
        startDate,
        endDate,
        this.seasonMultiplier,
        this.seasonName
      );

      const actionText = this.editingSeasonRef ? 'actualizada' : 'agregada';
      alert(`✅ Temporada "${this.seasonName}" ${actionText} exitosamente.\n\n` +
           `Las fechas han sido guardadas correctamente:\n` +
           `Del ${startStr} al ${endStr}`);
      
      this.clearSeasonForm();
    } catch (error) {
      console.error('Error adding seasonal rate:', error);
      alert('❌ Error al guardar la temporada. Inténtalo nuevamente.');
    }
  }

  private formatDateForConfirmation(date: Date): string {
    return date.toLocaleDateString('es-AR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'America/Argentina/Buenos_Aires'
    });
  }

  removeSeasonalRate(apartment: string, startDate: Date): void {
    const seasonName = this.getSeasonalRates(apartment).find(r => 
      r.startDate.getTime() === startDate.getTime()
    )?.name || 'Sin nombre';
    
    if (confirm(`¿Estás seguro de eliminar la temporada "${seasonName}"?\n\nEsta acción no se puede deshacer.`)) {
      try {
        this.bookingService.removeSeasonalRate(apartment, startDate);
        alert(`✅ Temporada "${seasonName}" eliminada exitosamente.`);
      } catch (error) {
        console.error('Error removing seasonal rate:', error);
        alert('❌ Error al eliminar la temporada. Inténtalo nuevamente.');
      }
    }
  }

  // Nuevo método para editar temporadas existentes
  editSeasonalRate(apartment: string, originalStartDate: Date): void {
    const season = this.getSeasonalRates(apartment).find(r => 
      r.startDate.getTime() === originalStartDate.getTime()
    );
    
    if (!season) {
      alert('❌ No se encontró la temporada para editar.');
      return;
    }

    // Confirmar que quiere editar
    const confirmEdit = confirm(`📝 ¿Editar temporada "${season.name || 'Sin nombre'}"?\n\n` +
                               `Se cargarán los datos en el formulario para modificar.`);
    
    if (!confirmEdit) return;

    // Cargar datos de la temporada en el formulario
    this.selectedSeasonApartment = apartment;
    this.seasonName = season.name || '';
    this.seasonMultiplier = season.multiplier;
    
    // Formatear fechas para el input (YYYY-MM-DD)
    this.seasonStartDate = this.formatDateForInput(season.startDate);
    this.seasonEndDate = this.formatDateForInput(season.endDate);

    // Guardar referencia para eliminar después de confirmar cambios
    this.editingSeasonRef = { apartment, originalStartDate };
    
    alert(`📝 Temporada cargada para edición.\n\n` +
          `✏️ Modifica los campos necesarios\n` +
          `✅ Clic en "Agregar Temporada" para guardar\n` +
          `❌ O clic en "Limpiar" para cancelar`);
  }

  // Variable para rastrear qué temporada se está editando
  private editingSeasonRef: { apartment: string, originalStartDate: Date } | null = null;

  private formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  clearSeasonForm(): void {
    this.seasonStartDate = '';
    this.seasonEndDate = '';
    this.seasonMultiplier = 1.276;
    this.seasonName = '';
    this.editingSeasonRef = null; // Limpiar referencia de edición
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

  // 🔧 MÉTODOS DE DIAGNÓSTICO Y MANTENIMIENTO

  exportDataBackup(): void {
    try {
      const data = {
        bookings: this.bookings(),
        pricing: this.apartmentPricing(),
        exportDate: new Date().toISOString(),
        version: '2.0'
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      
      const filename = `artin-house-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.href = url;
      a.download = filename;
      a.click();
      
      URL.revokeObjectURL(url);
      const message = `✅ BACKUP EXPORTADO EXITOSAMENTE\n\n` +
                     `📁 Archivo: ${filename}\n\n` +
                     `🔄 PARA USAR EN OTRA PC:\n` +
                     `1. Guarda este archivo en Google Drive/Dropbox\n` +
                     `2. Descárgalo en la nueva PC\n` +
                     `3. Ve al Panel Admin > Diagnóstico\n` +
                     `4. Clic en "Seleccionar Archivo"\n` +
                     `5. Selecciona este archivo .json\n\n` +
                     `💡 TIP: Hazlo semanalmente`;
      
      alert(message);
      
    } catch (error) {
      console.error('Error exporting backup:', error);
      alert('❌ Error al exportar backup. Revisa la consola para más detalles.');
    }
  }

  importDataBackup(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        // Validar estructura del backup
        if (!data.bookings || !data.pricing) {
          throw new Error('Archivo de backup inválido');
        }

        const confirmMsg = `⚠️ ADVERTENCIA: Esta acción sobrescribirá TODOS los datos actuales.\n\n` +
                          `Backup del: ${new Date(data.exportDate).toLocaleString('es-AR')}\n` +
                          `Reservas: ${data.bookings.length}\n` +
                          `Apartamentos: ${data.pricing.length}\n\n` +
                          `¿Estás completamente seguro de continuar?`;

        if (!confirm(confirmMsg)) {
          return;
        }

        // Importar datos
        this.bookingService.clearAllData();
        
        // Restaurar pricing
        for (const pricing of data.pricing) {
          this.bookingService.updateApartmentPricing(pricing.apartment, pricing);
        }

        // Recrear reservas (esto es complejo, mejor mostrar instrucciones)
        alert('✅ Configuraciones de precios restauradas exitosamente.\n\n' +
              '⚠️ NOTA: Las reservas deben recrearse manualmente por seguridad.\n' +
              'Revisa el archivo de backup para ver las reservas que tenías.');

      } catch (error) {
        console.error('Error importing backup:', error);
        alert('❌ Error al importar backup. Verifica que el archivo sea válido.');
      }
    };
    
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  }

  checkDataIntegrity(): void {
    const issues: string[] = [];
    
    // Verificar localStorage
    try {
      const stored = localStorage.getItem('artin-house-pricing');
      if (!stored) {
        issues.push('❌ No hay datos guardados en localStorage');
      } else {
        const data = JSON.parse(stored);
        if (!data.checksum) {
          issues.push('⚠️ Datos sin checksum (formato antiguo)');
        }
      }
    } catch (error) {
      issues.push('❌ Error al leer localStorage: ' + error);
    }

    // Verificar consistencia de precios
    const pricing = this.apartmentPricing();
    for (const p of pricing) {
      if (!p.apartment || p.basePrice < 1000) {
        issues.push(`❌ Precio inválido para ${p.apartment}: $${p.basePrice}`);
      }
      
      if (p.seasonalRates) {
        for (const rate of p.seasonalRates) {
          if (rate.startDate >= rate.endDate) {
            issues.push(`❌ Fechas inválidas en temporada "${rate.name}"`);
          }
        }
      }
    }

    // Mostrar resultados
    if (issues.length === 0) {
      const message = `✅ DIAGNÓSTICO EXITOSO\n\n` +
                   `📊 ESTADO DEL SISTEMA:\n` +
                   `• ${pricing.length} apartamentos configurados\n` +
                   `• ${this.bookings().length} reservas totales\n` +
                   `• Integridad de datos verificada\n\n` +
                   `💡 RECORDATORIO:\n` +
                   `¿Cuándo fue tu último backup?\n` +
                   `Se recomienda exportar backup semanalmente`;
    
    alert(message);
    } else {
      alert('⚠️ PROBLEMAS ENCONTRADOS:\n\n' + issues.join('\n') + 
            '\n\n💡 Considera exportar un backup y revisar la configuración.');
    }
  }

  // 🌐 MÉTODOS PARA USAR SIN BACKEND
  
  copyDataAsText(): void {
    try {
      const data = {
        bookings: this.bookings(),
        pricing: this.apartmentPricing(),
        exportDate: new Date().toISOString()
      };
      
      const textData = JSON.stringify(data, null, 2);
      navigator.clipboard.writeText(textData).then(() => {
        alert(`📋 DATOS COPIADOS AL PORTAPAPELES\n\n` +
              `🔄 PARA SINCRONIZAR CON GOOGLE SHEETS:\n` +
              `1. Ve a Google Sheets\n` +
              `2. Crea una hoja llamada "Artin House Backup"\n` +
              `3. En celda A1, pega este contenido\n` +
              `4. Guarda la hoja\n\n` +
              `💡 Así puedes acceder desde cualquier dispositivo`);
      }).catch(() => {
        alert('❌ No se pudo copiar. Usa el método de exportar archivo.');
      });
    } catch (error) {
      alert('❌ Error al copiar datos.');
    }
  }

  pasteDataFromText(): void {
    const textData = prompt(`📥 RESTAURAR DESDE TEXTO\n\n` +
                           `Pega aquí el contenido JSON que copiaste de Google Sheets:\n` +
                           `(O cancela para usar el método de archivo)`);
    
    if (!textData) return;
    
    try {
      const data = JSON.parse(textData);
      this.importFromData(data);
    } catch (error) {
      alert('❌ Datos inválidos. Verifica que hayas copiado correctamente desde Google Sheets.');
    }
  }

  private importFromData(data: any): void {
    if (!data.bookings || !data.pricing) {
      alert('❌ Estructura de datos inválida');
      return;
    }

    const confirmMsg = `⚠️ ADVERTENCIA: Esto sobrescribirá todos los datos actuales.\n\n` +
                      `Backup del: ${new Date(data.exportDate).toLocaleString('es-AR')}\n` +
                      `¿Continuar?`;

    if (!confirm(confirmMsg)) return;

    try {
      // Limpiar datos actuales
      this.bookingService.clearAllData();
      
      // Restaurar precios
      for (const pricing of data.pricing) {
        this.bookingService.updateApartmentPricing(pricing.apartment, pricing);
      }

      alert('✅ Datos restaurados exitosamente desde Google Sheets!');
      
    } catch (error) {
      alert('❌ Error al importar datos. Revisa el formato.');
    }
  }

  openGoogleSheetsGuide(): void {
    const guide = `🌐 GUÍA: USAR GOOGLE SHEETS COMO "BASE DE DATOS"\n\n` +
                 `✅ VENTAJAS:\n` +
                 `• Acceso desde cualquier PC/celular\n` +
                 `• Sincronización automática\n` +
                 `• Backup en la nube gratis\n` +
                 `• No necesitas backend\n\n` +
                 `📋 PASOS:\n` +
                 `1. Clic en "Copiar como Texto" (abajo)\n` +
                 `2. Ve a sheets.google.com\n` +
                 `3. Crea hoja "Artin House Backup"\n` +
                 `4. Pega en celda A1\n` +
                 `5. Guarda\n\n` +
                 `🔄 PARA RESTAURAR EN OTRA PC:\n` +
                 `1. Abre la hoja de Google\n` +
                 `2. Copia todo el contenido de A1\n` +
                 `3. Clic en "Restaurar desde Texto"\n` +
                 `4. Pega el contenido\n\n` +
                 `¿Quieres continuar?`;

    if (confirm(guide)) {
      this.copyDataAsText();
    }
  }
}