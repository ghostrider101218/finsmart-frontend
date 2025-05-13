import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-evaluacion-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatTabsModule],
  templateUrl: './evaluacion-dialog.component.html',
  styleUrl: './evaluacion-dialog.component.scss'
})
export class EvaluacionDialogComponent {
  form: FormGroup;
  tiposServicio = [
    { value: 1, label: 'Crédito Empresarial' },
    { value: 2, label: 'Leasing' },
    { value: 3, label: 'Factoring' }
  ];
  tiposDocumentoAval = [
    { value: 'DNI', label: 'DNI' },
    { value: 'RUC', label: 'RUC' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EvaluacionDialogComponent>
  ) {
    this.form = this.fb.group({
      tipoServicio: [null, Validators.required],
      montoSolicitado: [null, [Validators.required, Validators.min(1)]],
      motivo: ['', Validators.required],
      aval: ['', Validators.required],
      tipoDocumentoAval: [null, Validators.required],
      numeroDocumentoAval: ['', Validators.required],
      ruc: ['', Validators.required],
      dueno: ['', Validators.required],
      dniDueno: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
