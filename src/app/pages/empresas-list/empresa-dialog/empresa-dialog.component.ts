import { Component, OnInit, Optional, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Empresa } from '../../../models/empresa.enitity';
import { IdGeneratorService } from '../../../services/id-generator.service';

export interface DialogData {
  modo: 'crear' | 'editar';
  empresa: Empresa | null;
}

@Component({
  selector: 'app-empresa-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' }
  ],
  templateUrl: './empresa-dialog.component.html',
  styleUrls: ['./empresa-dialog.component.scss']
})
export class EmpresaDialogComponent implements OnInit {
  // Formulario para crear/editar empresa
  empresaForm: FormGroup;
  
  // Datos de entrada
  empresa: Empresa | null;
  modo: 'crear' | 'editar';
  
  // Callback para guardar
  onSave: (data: Empresa) => void;
  onCancel: () => void;
  maxDate: Date;

  constructor(
    private fb: FormBuilder,
    private idGenerator: IdGeneratorService,
    @Optional() private dialogRef?: MatDialogRef<EmpresaDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data?: DialogData
  ) {
    this.empresa = data?.empresa || null;
    this.modo = data?.modo || 'crear';
    this.onSave = () => {};
    this.onCancel = () => {};
    this.maxDate = new Date();
    
    this.empresaForm = this.fb.group({
      nombreEmpresa: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      ruc: ['', [
        Validators.required,
        Validators.pattern(/^\d{11}$/),
        Validators.minLength(11),
        Validators.maxLength(11)
      ]],
      fundacion: [new Date(), [
        Validators.required
      ]],
      numTrabajadores: [1, [
        Validators.required,
        Validators.min(1),
        Validators.max(999999)
      ]],
      isAdmisible: [true],
      idCategoria: [ [
        Validators.required
      ]],
      idHistorialCrediticio: [1, [
        Validators.required
      ]]
    });
  }

  ngOnInit(): void {
    if (this.empresa && this.modo === 'editar') {
      const fundacionDate = this.empresa.fundacion instanceof Date 
        ? this.empresa.fundacion 
        : new Date(this.empresa.fundacion || new Date());

      this.empresaForm.patchValue({
        nombreEmpresa: this.empresa.nombreEmpresa,
        ruc: this.empresa.ruc,
        fundacion: fundacionDate,
        numTrabajadores: this.empresa.numTrabajadores,
        isAdmisible: this.empresa.isAdmisible,
        idCategoria: this.empresa.idCategoria || 1,
        idHistorialCrediticio: this.empresa.idHistorialCrediticio || 1
      });
    }
  }

  guardarEmpresa(): void {
    if (this.empresaForm.invalid) {
      Object.keys(this.empresaForm.controls).forEach(key => {
        const control = this.empresaForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    const formValues = this.empresaForm.value;
    const datosEmpresa: Empresa = {
      ...formValues,
      fundacion: formValues.fundacion.toISOString().split('T')[0],
      idCategoria: Number(formValues.idCategoria),
      idHistorialCrediticio: Number(formValues.idHistorialCrediticio)
    };

    // Si es edición, mantener el ID existente
    if (this.modo === 'editar' && this.empresa) {
      datosEmpresa.idEmpresa = this.empresa.idEmpresa;
    } else {
      // Si es creación, generar un nuevo ID
      datosEmpresa.idEmpresa = this.idGenerator.generateId();
    }

    this.onSave(datosEmpresa);
    if (this.dialogRef) {
      this.dialogRef.close(datosEmpresa);
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.empresaForm.get(controlName);
    if (!control) return '';
    
    if (control.hasError('required')) {
      return 'Este campo es requerido';
    }
    
    if (control.hasError('minlength')) {
      return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres`;
    }
    
    if (control.hasError('maxlength')) {
      return `Máximo ${control.errors?.['maxlength'].requiredLength} caracteres`;
    }
    
    if (control.hasError('pattern')) {
      if (controlName === 'ruc') {
        return 'El RUC debe tener 11 dígitos numéricos';
      }
      return 'Formato inválido';
    }
    
    if (control.hasError('min')) {
      return `El valor mínimo es ${control.errors?.['min'].min}`;
    }
    
    if (control.hasError('max')) {
      return `El valor máximo es ${control.errors?.['max'].max}`;
    }
    
    return '';
  }

  cancelar(): void {
    this.onCancel();
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
} 