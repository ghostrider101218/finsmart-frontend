import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaService } from '../../services/empresa.service';
import { EncargadoService } from '../../services/encargado.service';
import { EvaluacionService } from '../../services/evaluacion.service';
import { Empresa } from '../../models/empresa.enitity';
import { Encargado } from '../../models/encargado.enitity';
import { Evaluacion } from '../../models/evaluacion.enitity';

@Component({
  selector: 'app-demo-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demo-services.component.html',
  styleUrls: ['./demo-services.component.scss']
})
export class DemoServicesComponent implements OnInit {
  empresas: Empresa[] = [];
  encargados: Encargado[] = [];
  evaluaciones: Evaluacion[] = [];
  
  constructor(
    private empresaService: EmpresaService,
    private encargadoService: EncargadoService,
    private evaluacionService: EvaluacionService
  ) {}

  ngOnInit(): void {
    this.loadEmpresas();
    this.loadEncargados();
    this.loadEvaluaciones();
  }

  loadEmpresas(): void {
    this.empresaService.getAll().subscribe({
      next: (response) => {
        this.empresas = response.data;
        console.log('Empresas cargadas:', this.empresas);
      },
      error: (error) => {
        console.error('Error al cargar empresas:', error);
      }
    });
  }

  loadEncargados(): void {
    this.encargadoService.getAll().subscribe({
      next: (response) => {
        this.encargados = response.data;
        console.log('Encargados cargados:', this.encargados);
      },
      error: (error) => {
        console.error('Error al cargar encargados:', error);
      }
    });
  }

  loadEvaluaciones(): void {
    this.evaluacionService.getAll().subscribe({
      next: (response) => {
        this.evaluaciones = response.data;
        console.log('Evaluaciones cargadas:', this.evaluaciones);
      },
      error: (error) => {
        console.error('Error al cargar evaluaciones:', error);
      }
    });
  }

  createEmpresa(): void {
    const nuevaEmpresa: Empresa = {
      nombreEmpresa: 'Nueva Empresa',
      ruc: '12345678901',
      fundacion: new Date('2023-01-01'),
      numTrabajadores: 10,
      isAdmisible: true,
      idCategoria: 1,
      idHistorialCrediticio: 1
    };

    this.empresaService.create(nuevaEmpresa).subscribe({
      next: (response) => {
        console.log('Empresa creada:', response.data);
        this.loadEmpresas(); // Recargar la lista
      },
      error: (error) => {
        console.error('Error al crear empresa:', error);
      }
    });
  }

  createEncargado(): void {
    const nuevoEncargado: Encargado = {
      idEncargado: 100001,
      nombreEncargado: 'Nuevo Encargado',
      dniEncargado: '12345678',
      puesto: 'Gerente de Finanzas'
    };

    this.encargadoService.create(nuevoEncargado).subscribe({
      next: (response) => {
        console.log('Encargado creado:', response.data);
        this.loadEncargados(); // Recargar la lista
      },
      error: (error) => {
        console.error('Error al crear encargado:', error);
      }
    });
  }

  createEvaluacion(): void {
    // Necesitamos tener al menos una empresa y un encargado
    if (this.empresas.length === 0 || this.encargados.length === 0) {
      console.error('Debe crear al menos una empresa y un encargado antes de crear una evaluación');
      alert('Debe crear al menos una empresa y un encargado antes de crear una evaluación');
      return;
    }

    const nuevaEvaluacion: Evaluacion = {
      fechaCreacion: new Date(),
      montoSolicitado: 50000,
      sustento: 'Compra de equipos',
      estadoEvaluacion: 'Pendiente',
      tieneDeudas: false,
      topeNacional: true,
      tieneCasosLegalesAbier: false,
      ratingAqMas: true,
      idEmpresa: this.empresas[0].idEmpresa,
      idServicio: 1, // Asumiendo que existe este servicio
      idEncargado: this.encargados[0].idEncargado
    };

    this.evaluacionService.create(nuevaEvaluacion).subscribe({
      next: (response) => {
        console.log('Evaluación creada:', response.data);
        this.loadEvaluaciones(); // Recargar la lista
      },
      error: (error) => {
        console.error('Error al crear evaluación:', error);
      }
    });
  }

  // Métodos para búsquedas avanzadas
  buscarPorEstado(estado: string): void {
    this.evaluacionService.getEvaluacionesPorEstado(estado).subscribe({
      next: (response) => {
        this.evaluaciones = response.data;
        console.log(`Evaluaciones con estado ${estado}:`, this.evaluaciones);
      },
      error: (error) => {
        console.error(`Error al buscar evaluaciones con estado ${estado}:`, error);
      }
    });
  }

  buscarPorEmpresa(idEmpresa: string): void {
    if (!idEmpresa) {
      this.loadEvaluaciones();
      return;
    }

    this.evaluacionService.getEvaluacionesPorEmpresa(Number(idEmpresa)).subscribe({
      next: (response) => {
        this.evaluaciones = response.data;
        console.log(`Evaluaciones para empresa ${idEmpresa}:`, this.evaluaciones);
      },
      error: (error) => {
        console.error(`Error al buscar evaluaciones para empresa ${idEmpresa}:`, error);
      }
    });
  }

  buscarPorMontoMayor(monto: string): void {
    const montoNumerico = Number(monto);
    if (isNaN(montoNumerico) || montoNumerico <= 0) {
      alert('Ingrese un monto válido');
      return;
    }

    this.evaluacionService.getEvaluacionesPorMontoMayorA(montoNumerico).subscribe({
      next: (response) => {
        this.evaluaciones = response.data;
        console.log(`Evaluaciones con monto mayor a ${monto}:`, this.evaluaciones);
      },
      error: (error) => {
        console.error(`Error al buscar evaluaciones con monto mayor a ${monto}:`, error);
      }
    });
  }

  cambiarEstadoEvaluacion(idEvaluacion: number | undefined, nuevoEstado: string): void {
    if (!idEvaluacion) {
      alert('ID de evaluación no válido');
      return;
    }

    this.evaluacionService.cambiarEstado(idEvaluacion, nuevoEstado).subscribe({
      next: (response) => {
        console.log(`Estado de evaluación cambiado a ${nuevoEstado}:`, response.data);
        this.loadEvaluaciones(); // Recargar la lista
      },
      error: (error) => {
        console.error(`Error al cambiar estado de evaluación a ${nuevoEstado}:`, error);
      }
    });
  }
} 