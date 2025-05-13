import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EvaluacionDialogComponent } from '../../shared/components/evaluacion-dialog/evaluacion-dialog.component';
import { Evaluacion } from '../../models/evaluacion.enitity';

@Component({
  selector: 'app-solicitudes-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitudes-list.component.html',
  styleUrl: './solicitudes-list.component.scss'
})
export class SolicitudesListComponent {
  evaluaciones: Evaluacion[] = [
    {
      idEvaluacion: 1,
      fechaCreacion: new Date('2025-03-12'),
      montoSolicitado: 8242,
      sustento: 'Motivo ejemplo',
      estadoEvaluacion: 'En proceso',
      idEmpresa: 1,
      idServicio: 1,
      idEncargado: 1
    },
    {
      idEvaluacion: 2,
      fechaCreacion: new Date('2025-03-12'),
      montoSolicitado: 8242,
      sustento: 'Motivo ejemplo',
      estadoEvaluacion: 'En proceso',
      idEmpresa: 1,
      idServicio: 1,
      idEncargado: 1
    },
    {
      idEvaluacion: 3,
      fechaCreacion: new Date('2025-03-12'),
      montoSolicitado: 8242,
      sustento: 'Motivo ejemplo',
      estadoEvaluacion: 'En proceso',
      idEmpresa: 1,
      idServicio: 1,
      idEncargado: 1
    },
    {
      idEvaluacion: 4,
      fechaCreacion: new Date('2025-03-12'),
      montoSolicitado: 8242,
      sustento: 'Motivo ejemplo',
      estadoEvaluacion: 'Pendiente',
      idEmpresa: 1,
      idServicio: 1,
      idEncargado: 1
    },
    {
      idEvaluacion: 5,
      fechaCreacion: new Date('2025-03-12'),
      montoSolicitado: 8242,
      sustento: 'Motivo ejemplo',
      estadoEvaluacion: 'Pendiente',
      idEmpresa: 1,
      idServicio: 1,
      idEncargado: 1
    },
    {
      idEvaluacion: 6,
      fechaCreacion: new Date('2025-03-12'),
      montoSolicitado: 8242,
      sustento: 'Motivo ejemplo',
      estadoEvaluacion: 'Pendiente',
      idEmpresa: 1,
      idServicio: 1,
      idEncargado: 1
    }
  ];

  constructor(private dialog: MatDialog) {}

  openEvaluacionDialog() {
    this.dialog.open(EvaluacionDialogComponent, {
      width: '700px',
      autoFocus: false
    });
  }
}
