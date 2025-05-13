import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-simulador',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSliderModule,
    MatIconModule
  ],
  template: `
    <div class="simulator-container">
      <div class="simulator-header">
        <h1>Simulador de Préstamos</h1>
        <p>Calcula tu préstamo y conoce las cuotas mensuales</p>
      </div>

      <div class="simulator-content">
        <mat-card class="simulator-form">
          <form [formGroup]="loanForm" (ngSubmit)="calculateLoan()">
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Tipo de Préstamo</mat-label>
                <mat-select formControlName="loanType">
                  <mat-option value="capital">Capital de Trabajo</mat-option>
                  <mat-option value="activos">Activos Fijos</mat-option>
                  <mat-option value="expansion">Expansión de Negocio</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Monto del Préstamo (S/.)</mat-label>
                <input matInput type="number" formControlName="amount" min="5000" max="500000">
                <mat-error *ngIf="loanForm.get('amount')?.hasError('required')">
                  El monto es requerido
                </mat-error>
                <mat-error *ngIf="loanForm.get('amount')?.hasError('min')">
                  El monto mínimo es S/. 5,000
                </mat-error>
                <mat-error *ngIf="loanForm.get('amount')?.hasError('max')">
                  El monto máximo es S/. 500,000
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Plazo (meses)</mat-label>
                <mat-select formControlName="term">
                  <mat-option *ngFor="let month of availableTerms" [value]="month">
                    {{month}} meses
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <button mat-raised-button color="primary" type="submit" [disabled]="!loanForm.valid">
              Calcular
            </button>
          </form>
        </mat-card>

        <mat-card class="results-card" *ngIf="showResults">
          <h2>Resultados de la Simulación</h2>
          
          <div class="result-item">
            <span class="label">Cuota Mensual:</span>
            <span class="value">S/. {{monthlyPayment | number:'1.2-2'}}</span>
          </div>

          <div class="result-item">
            <span class="label">Tasa Efectiva Anual:</span>
            <span class="value">{{annualRate}}%</span>
          </div>

          <div class="result-item">
            <span class="label">Total a Pagar:</span>
            <span class="value">S/. {{totalAmount | number:'1.2-2'}}</span>
          </div>

          <div class="result-actions">
            <button mat-raised-button color="primary" (click)="applyNow()">
              Solicitar Ahora
            </button>
            <button mat-stroked-button color="primary" (click)="downloadSchedule()">
              Descargar Cronograma
            </button>
          </div>

          <div class="disclaimer">
            <mat-icon>info</mat-icon>
            <p>Esta simulación es referencial. La tasa final estará sujeta a evaluación crediticia.</p>
          </div>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .simulator-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .simulator-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .simulator-header h1 {
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .simulator-header p {
      color: #666;
      font-size: 1.1rem;
    }

    .simulator-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    .simulator-form {
      padding: 2rem;
    }

    .form-row {
      margin-bottom: 1.5rem;
    }

    mat-form-field {
      width: 100%;
    }

    .results-card {
      padding: 2rem;
      background: linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%);
    }

    .results-card h2 {
      color: #333;
      margin-bottom: 2rem;
    }

    .result-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #eee;
    }

    .result-item .label {
      color: #666;
    }

    .result-item .value {
      font-size: 1.2rem;
      font-weight: 600;
      color: #1e88e5;
    }

    .result-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
      margin-bottom: 2rem;
    }

    .disclaimer {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 4px;
    }

    .disclaimer mat-icon {
      color: #666;
    }

    .disclaimer p {
      margin: 0;
      font-size: 0.9rem;
      color: #666;
    }

    @media (max-width: 768px) {
      .simulator-container {
        padding: 1rem;
      }

      .simulator-content {
        grid-template-columns: 1fr;
      }

      .result-actions {
        flex-direction: column;
      }

      .simulator-header h1 {
        font-size: 2rem;
      }
    }
  `]
})
export class SimuladorComponent implements OnInit {
  loanForm: FormGroup;
  showResults = false;
  monthlyPayment = 0;
  annualRate = 15.5; // Example rate
  totalAmount = 0;
  availableTerms = [6, 12, 18, 24, 36, 48];

  constructor(private fb: FormBuilder) {
    this.loanForm = this.fb.group({
      loanType: ['capital', Validators.required],
      amount: ['', [Validators.required, Validators.min(5000), Validators.max(500000)]],
      term: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  calculateLoan() {
    if (this.loanForm.valid) {
      const amount = this.loanForm.get('amount')?.value;
      const term = this.loanForm.get('term')?.value;
      const monthlyRate = this.annualRate / 12 / 100;

      // Calculate monthly payment using the loan amortization formula
      this.monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                           (Math.pow(1 + monthlyRate, term) - 1);
      
      this.totalAmount = this.monthlyPayment * term;
      this.showResults = true;
    }
  }

  applyNow() {
    // Navigate to loan application
    console.log('Navigating to loan application...');
  }

  downloadSchedule() {
    // Generate and download payment schedule
    console.log('Downloading payment schedule...');
  }
} 