import { Component, ChangeDetectionStrategy, inject, OnInit, computed, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslationService } from '../../services/translation.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { WhatsappButtonComponent } from '../whatsapp-button/whatsapp-button.component';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  apartment: 'Artin House I' | 'Artin House II' | 'Ambos';
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, WhatsappButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit, AfterViewInit {
  private translationService = inject(TranslationService);
  private sanitizer = inject(DomSanitizer);

  @ViewChild('contactVideo', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;

  // Safe URL for map
  safeMapUrl!: SafeResourceUrl;
  
  // Raw map URL
  mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.500918731006!2d-68.8796112!3d-33.037376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e808383e74889%3A0x6280436d713c77f0!2sBustamante%20482%2C%20M5507CMM%20Luj%C3%A1n%20de%20Cuyo%2C%20Mendoza%2C%20Argentina!5e0!3m2!1sen!2sar!4v1704067200000!5m2!1sen!2sar';

  // Form data
  contactForm: ContactForm = {
    name: '',
    email: '',
    phone: '',
    message: '',
    apartment: 'Artin House I'
  };



  // Company Info for map
  companyInfo = {
    name: 'Artin House Luján',
    address: {
      street: 'Bustamante 482',
      city: 'Luján de Cuyo',
      postalCode: 'C.P. 5507',
      province: 'Mendoza',
      country: 'Argentina'
    },
    contact: {
      email: 'artinhousemza@gmail.com',
      phone: '+54 261 698 4285'
    },
    map: {
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.500918731006!2d-68.8796112!3d-33.037376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e808383e74889%3A0x6280436d713c77f0!2sBustamante%20482%2C%20M5507CMM%20Luj%C3%A1n%20de%20Cuyo%2C%20Mendoza%2C%20Argentina!5e0!3m2!1sen!2sar!4v1704067200000!5m2!1sen!2sar',
      title: 'Ubicación de Artin House Luján'
    }
  };

  // Translated texts as computed signals
  t = computed(() => ({
    title: this.translationService.translate('contact.title')(),
    subtitle: this.translationService.translate('contact.subtitle')(),
    formTitle: this.translationService.translate('contact.formTitle')(),
    nameLabel: this.translationService.translate('contact.nameLabel')(),
    emailLabel: this.translationService.translate('contact.emailLabel')(),
    phoneLabel: this.translationService.translate('contact.phoneLabel')(),
    apartmentLabel: this.translationService.translate('contact.apartmentLabel')(),
    messageLabel: this.translationService.translate('contact.messageLabel')(),
    sendButton: this.translationService.translate('contact.sendButton')(),
    locationTitle: this.translationService.translate('contact.locationTitle')(),
    successMsg: this.translationService.translate('contact.successMsg')(),
    errorMsg: this.translationService.translate('contact.errorMsg')(),
  }));



  onSubmit(): void {
    if (this.isFormValid()) {
      this.sendContactEmail();
    }
  }

  private isFormValid(): boolean {
    return this.contactForm.name.trim() !== '' &&
           this.contactForm.email.trim() !== '' &&
           this.contactForm.message.trim() !== '';
  }

  private sendContactEmail(): void {
    const subject = encodeURIComponent(`Contacto desde web - ${this.contactForm.apartment}`);
    const body = encodeURIComponent(`
Nuevo mensaje de contacto:

👤 Nombre: ${this.contactForm.name}
📧 Email: ${this.contactForm.email}
📱 Teléfono: ${this.contactForm.phone || 'No proporcionado'}
🏠 Interés en: ${this.contactForm.apartment}

💬 Mensaje:
${this.contactForm.message}

---
Enviado desde: Artin House Luján - Página de Contacto
    `);

    // Abrir cliente de email
    window.open(`mailto:${this.companyInfo.contact.email}?subject=${subject}&body=${body}`, '_blank');

    // Reset form
    this.contactForm = {
      name: '',
      email: '',
      phone: '',
      message: '',
      apartment: 'Artin House I'
    };
  }

  ngOnInit(): void {
    // Sanitize the map URL to make it safe for Angular
    this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapUrl);
  }

  ngAfterViewInit(): void {
    // Asegurar que el video esté muted
    if (this.videoElement?.nativeElement) {
      const video = this.videoElement.nativeElement;
      video.muted = true;
      video.defaultMuted = true;
      
      // Intentar reproducir el video
      video.play().catch(error => {
        console.log('Autoplay prevented:', error);
      });
    }
  }
}