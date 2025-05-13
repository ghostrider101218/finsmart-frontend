import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  tasaDesde: number;
  plazoMaximo: number;
  montoMaximo: number;
  requisitos: string[];
  ventajas: string[];
  icon: string;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    ProductCardComponent
  ],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {
  productos: Producto[] = [
    {
      id: 'capital-trabajo',
      nombre: 'Capital de Trabajo',
      descripcion: 'Financiamiento para las operaciones diarias de tu empresa, compra de inventario y pago a proveedores.',
      tasaDesde: 14.5,
      plazoMaximo: 24,
      montoMaximo: 200000,
      requisitos: [
        '12 meses de operación',
        'Ventas anuales > S/. 300,000',
        'Sin deudas morosas'
      ],
      ventajas: [
        'Aprobación en 24 horas',
        'Sin garantías hipotecarias',
        'Cuotas flexibles',
        'Período de gracia opcional'
      ],
      icon: 'account_balance_wallet'
    },
    {
      id: 'activos-fijos',
      nombre: 'Activos Fijos',
      descripcion: 'Adquiere maquinaria, equipos o vehículos para potenciar el crecimiento de tu negocio.',
      tasaDesde: 12.9,
      plazoMaximo: 48,
      montoMaximo: 500000,
      requisitos: [
        '24 meses de operación',
        'Ventas anuales > S/. 500,000',
        'Score crediticio > 650'
      ],
      ventajas: [
        'Tasas preferenciales',
        'Plazos extendidos',
        'Financiamiento hasta 80%',
        'Asesoría especializada'
      ],
      icon: 'precision_manufacturing'
    },
    {
      id: 'expansion',
      nombre: 'Expansión de Negocio',
      descripcion: 'Financia la apertura de nuevas sucursales, remodelaciones o proyectos de crecimiento.',
      tasaDesde: 13.5,
      plazoMaximo: 60,
      montoMaximo: 1000000,
      requisitos: [
        '36 meses de operación',
        'Ventas anuales > S/. 1,000,000',
        'Estados financieros auditados'
      ],
      ventajas: [
        'Estructura personalizada',
        'Período de gracia hasta 6 meses',
        'Asesoría en proyectos',
        'Beneficios exclusivos'
      ],
      icon: 'trending_up'
    }
  ];
} 