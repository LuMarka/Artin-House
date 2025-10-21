import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.css'],
  standalone: true
})
export class WhatsappButtonComponent {
  phoneNumber = '5492615901250'; // Número de WhatsApp
  
  openWhatsApp() {
    const message = encodeURIComponent('¡Hola! Me interesa obtener más información sobre Artin House Luján.');
    const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }
}