import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { ArtinHouseIComponent } from './components/artin-house-i/artin-house-i.component';
import { ArtinHouseIIComponent } from './components/artin-house-ii/artin-house-ii.component';
import { NuestrasPoliticasComponent } from './components/nuestras-politicas/nuestras-politicas.component';
import { AdminComponent } from './components/admin/admin.component';
import { MendozaGuideComponent } from './components/mendoza-guide/mendoza-guide.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Artin House - Apartamentos en Luján'
  },
  {
    path: 'artin-house-i',
    component: ArtinHouseIComponent,
    title: 'Artin House I - Apartamento Premium'
  },
  {
    path: 'artin-house-ii',
    component: ArtinHouseIIComponent,
    title: 'Artin House II - Apartamento Moderno'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contacto - Artin House'
  },
  {
    path: 'nuestras-politicas',
    component: NuestrasPoliticasComponent,
    title: 'Nuestras Políticas - Artin House'
  },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'Panel de Administración - Artin House'
  },
  {
    path: 'que-hacer-en-mendoza',
    component: MendozaGuideComponent,
    title: 'Qué hacer en Mendoza - Guía Completa'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];