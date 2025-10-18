import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslationService } from '../../services/translation.service';

interface ContactInfo {
  type: 'email' | 'phone' | 'address';
  icon: string;
  value: string;
  href?: string;
  hasSubtext?: boolean;
  subtext?: string;
}

interface SocialLink {
  platform: string;
  url: string;
  ariaLabel: string;
  icon: string;
}

interface CompanyInfo {
  name: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    province: string;
    country: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  map: {
    embedUrl: string;
    title: string;
  };
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  private translationService = inject(TranslationService);
  private sanitizer = inject(DomSanitizer);
  currentYear = new Date().getFullYear();

  // Safe URL for map
  safeMapUrl!: SafeResourceUrl;
  
  // Raw map URL
  mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.500918731006!2d-68.8796112!3d-33.037376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e808383e74889%3A0x6280436d713c77f0!2sBustamante%20482%2C%20M5507CMM%20Luj%C3%A1n%20de%20Cuyo%2C%20Mendoza%2C%20Argentina!5e0!3m2!1sen!2sar!4v1704067200000!5m2!1sen!2sar';

  // Company Information
  companyInfo: CompanyInfo = {
    name: 'Artin House Luján',
    address: {
      street: 'Bustamante 482',
      city: 'Luján de Cuyo',
      postalCode: '5507',
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

  // Contact Information Array
  contactInfo: ContactInfo[] = [
    {
      type: 'email',
      icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      value: this.companyInfo.contact.email,
      href: `mailto:${this.companyInfo.contact.email}`
    },
    {
      type: 'phone',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      value: this.companyInfo.contact.phone,
      href: `tel:${this.companyInfo.contact.phone}`
    },
    {
      type: 'address',
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
      value: `${this.companyInfo.address.street}, ${this.companyInfo.address.city}`,
      hasSubtext: true,
      subtext: `${this.companyInfo.address.postalCode}, ${this.companyInfo.address.province}, ${this.companyInfo.address.country}`
    }
  ];

  // Social Media Links
  socialLinks: SocialLink[] = [
    {
      platform: 'facebook',
      url: '#',
      ariaLabel: 'Facebook',
      icon: 'M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.494v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z'
    },
    {
      platform: 'instagram',
      url: '#',
      ariaLabel: 'Instagram',
      icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.28-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44c0-.795-.645-1.44-1.441-1.44z'
    }
  ];

  // Translated texts
  t = {
    subtitle: this.translationService.translate('footer.subtitle'),
    contactTitle: this.translationService.translate('footer.contactTitle'),
    followTitle: this.translationService.translate('footer.followTitle'),
    locationTitle: this.translationService.translate('footer.locationTitle'),
    copyright: this.translationService.translate('footer.copyright'),
    policies: this.translationService.translate('nav.policies'),
  }

  ngOnInit(): void {
    // Sanitize the map URL to make it safe for Angular
    this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapUrl);
  }
}