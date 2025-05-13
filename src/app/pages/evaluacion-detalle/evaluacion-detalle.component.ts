import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evaluacion-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evaluacion-detalle.component.html',
  styleUrls: ['./evaluacion-detalle.component.scss']
})
export class EvaluacionDetalleComponent {
  empresaId: string;
  evaluacionId: string;

  constructor(private route: ActivatedRoute) {
    this.empresaId = this.route.snapshot.params['id'];
    this.evaluacionId = this.route.snapshot.params['evalId'];
  }
} 