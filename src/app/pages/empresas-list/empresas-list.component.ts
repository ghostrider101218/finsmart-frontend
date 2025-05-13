import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmpresaService } from '../../services/empresa.service';
import { EvaluacionService } from '../../services/evaluacion.service';
import { Empresa } from '../../models/empresa.enitity';
import { Evaluacion } from '../../models/evaluacion.enitity';
import { ModalComponent } from './modal/modal.component';
import { EmpresaDialogComponent } from './empresa-dialog/empresa-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-empresas-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatChipsModule,
    MatDialogModule,
    MatCardModule,
    MatTooltipModule,
    ModalComponent,
    EmpresaDialogComponent,
    ConfirmDialogComponent
  ],
  templateUrl: './empresas-list.component.html',
  styleUrls: ['./empresas-list.component.scss']
})
export class EmpresasListComponent implements OnInit, AfterViewInit {
  // Columnas para la tabla de empresas
  displayedColumns: string[] = [
    'idEmpresa',
    'nombreEmpresa',
    'ruc',
    'fundacion',
    'numTrabajadores',
    'isAdmisible',
    'acciones'
  ];

  // Columnas para la tabla de evaluaciones
  displayedColumnsEval: string[] = [
    'idEvaluacion',
    'fechaCreacion',
    'montoSolicitado',
    'estadoEvaluacion',
    'sustento',
    'nombreEncargado',
    'tipoServicio'
  ];

  // DataSource y paginación
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Empresa>;

  // Datos y estados
  empresas: Empresa[] = [];
  empresaSeleccionada: Empresa | null = null;
  evaluacionesEmpresa: Evaluacion[] = [];
  cargando = false;
  error = '';
  mostrarEvaluaciones = false;

  filterControl = new FormControl('');
  dataSource: MatTableDataSource<Empresa>;
  evaluacionesDataSource: MatTableDataSource<Evaluacion>;

  constructor(
    private empresaService: EmpresaService,
    private evaluacionService: EvaluacionService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Empresa>([]);
    this.evaluacionesDataSource = new MatTableDataSource<Evaluacion>([]);
  }

  ngOnInit(): void {
    this.cargarEmpresas();
    
    this.filterControl.valueChanges.subscribe(value => {
      if (this.dataSource) {
        this.dataSource.filter = (value || '').trim().toLowerCase();
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    if (this.evaluacionesDataSource) {
      this.evaluacionesDataSource.paginator = this.paginator;
      this.evaluacionesDataSource.sort = this.sort;
    }
  }

  cargarEmpresas(): void {
    this.cargando = true;
    this.error = '';
    
    this.empresaService.getAll().subscribe({
      next: (response) => {
        this.empresas = response.data;
        this.dataSource.data = this.empresas;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar empresas: ' + err.message;
        this.cargando = false;
        this.mostrarError('Error al cargar empresas');
        console.error('Error cargando empresas:', err);
      }
    });
  }

  nuevaEmpresa(): void {
    console.log('Abriendo diálogo para nueva empresa');
    const dialogRef = this.dialog.open(EmpresaDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {
        modo: 'crear',
        empresa: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos para crear nueva empresa:', result);
        this.crearEmpresa(result);
      }
    });
  }

  crearEmpresa(datosEmpresa: Empresa): void {
    console.log('Creando nueva empresa con datos:', datosEmpresa);
    this.cargando = true;
    
    this.empresaService.create(datosEmpresa).subscribe({
      next: () => {
        this.cargarEmpresas();
        this.cargando = false;
        this.mostrarExito('Empresa creada con éxito');
      },
      error: (err) => {
        this.error = `Error al crear empresa: ${err.message}`;
        this.cargando = false;
        this.mostrarError('Error al crear empresa');
        console.error('Error creando empresa:', err);
      }
    });
  }

  editarEmpresa(empresa: Empresa): void {
    console.log('Abriendo diálogo para editar empresa:', empresa);
    const dialogRef = this.dialog.open(EmpresaDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {
        modo: 'editar',
        empresa: {...empresa}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos para actualizar empresa:', result);
        this.actualizarEmpresa(result);
      }
    });
  }

  actualizarEmpresa(datosEmpresa: Empresa): void {
    console.log('Actualizando empresa con datos:', datosEmpresa);
    this.cargando = true;
    
    this.empresaService.update(datosEmpresa.idEmpresa!, datosEmpresa).subscribe({
      next: () => {
        this.cargarEmpresas();
        this.cargando = false;
        this.mostrarExito('Empresa actualizada con éxito');
      },
      error: (err) => {
        this.error = `Error al actualizar empresa: ${err.message}`;
        this.cargando = false;
        this.mostrarError('Error al actualizar empresa');
        console.error('Error actualizando empresa:', err);
      }
    });
  }

  eliminarEmpresa(empresa: Empresa): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Está seguro que desea eliminar la empresa "${empresa.nombreEmpresa}"?`,
        confirmText: 'Eliminar',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Eliminando empresa:', empresa);
        this.cargando = true;
        
        this.empresaService.delete(empresa.idEmpresa!).subscribe({
          next: () => {
            this.cargarEmpresas();
            this.cargando = false;
            this.mostrarExito('Empresa eliminada con éxito');
          },
          error: (err) => {
            this.error = `Error al eliminar empresa: ${err.message}`;
            this.cargando = false;
            this.mostrarError('Error al eliminar empresa');
            console.error('Error eliminando empresa:', err);
          }
        });
      }
    });
  }

  verEvaluaciones(empresa: Empresa): void {
    this.empresaSeleccionada = empresa;
    this.mostrarEvaluaciones = true;
    this.cargando = true;
    
    this.evaluacionService.getEvaluacionesPorEmpresa(empresa.idEmpresa!).subscribe({
      next: (response) => {
        this.evaluacionesEmpresa = response.data;
        this.evaluacionesDataSource.data = this.evaluacionesEmpresa;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar evaluaciones: ' + err.message;
        this.cargando = false;
        this.mostrarError('Error al cargar evaluaciones');
        console.error('Error cargando evaluaciones:', err);
      }
    });
  }

  volverAEmpresas(): void {
    this.mostrarEvaluaciones = false;
    this.empresaSeleccionada = null;
  }

  // Utilidades
  mostrarExito(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar']
    });
  }

  mostrarError(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });
  }

  // Filtrado y ordenamiento
  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterControl.setValue(filterValue);
  }
} 