import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';

interface FaqItem {
  pregunta: string;
  respuesta: string;
  categoria: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatChipsModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  faqs: FaqItem[] = [
    {
      pregunta: '¿Qué documentos necesito para solicitar un préstamo?',
      respuesta: 'Los documentos básicos incluyen: RUC activo, estados financieros de los últimos 12 meses, declaración de impuestos y documentos de identidad de los representantes legales.',
      categoria: 'Préstamos'
    },
    {
      pregunta: '¿Cuál es el monto máximo que puedo solicitar?',
      respuesta: 'El monto máximo depende de varios factores, incluyendo los ingresos de tu empresa, historial crediticio y capacidad de pago. Puede llegar hasta S/. 1,000,000 para empresas calificadas.',
      categoria: 'Préstamos'
    },
    {
      pregunta: '¿Cuánto tiempo toma el proceso de evaluación?',
      respuesta: 'El proceso de evaluación típicamente toma entre 24 y 48 horas hábiles una vez que todos los documentos han sido presentados correctamente.',
      categoria: 'Proceso'
    }
  ];
} 