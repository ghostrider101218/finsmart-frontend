import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
  ],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Dashboard Financiero</h1>
        <p class="welcome-text">Bienvenido de vuelta, {{userName}}</p>
      </div>

      <!-- Quick Stats -->
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-icon color="primary">account_balance</mat-icon>
          <div class="stat-content">
            <h3>Línea de Crédito</h3>
            <p class="stat-value">S/. 100,000</p>
            <mat-progress-bar mode="determinate" value="65"></mat-progress-bar>
            <p class="stat-subtitle">65% disponible</p>
          </div>
        </mat-card>

        <mat-card class="stat-card">
          <mat-icon color="accent">trending_up</mat-icon>
          <div class="stat-content">
            <h3>Préstamos Activos</h3>
            <p class="stat-value">3</p>
            <p class="stat-subtitle">Al día en pagos</p>
          </div>
        </mat-card>

        <mat-card class="stat-card">
          <mat-icon color="warn">speed</mat-icon>
          <div class="stat-content">
            <h3>Score Crediticio</h3>
            <p class="stat-value">780</p>
            <p class="stat-subtitle">Excelente</p>
          </div>
        </mat-card>
      </div>

      <!-- Recent Activity -->
      <mat-card class="activity-card">
        <h2>Actividad Reciente</h2>
        <div class="activity-list">
          <div class="activity-item">
            <mat-icon>check_circle</mat-icon>
            <div class="activity-content">
              <h4>Pago Mensual Procesado</h4>
              <p>Préstamo #123 - S/. 2,500</p>
              <small>Hace 2 días</small>
            </div>
          </div>
          <div class="activity-item">
            <mat-icon>description</mat-icon>
            <div class="activity-content">
              <h4>Nueva Solicitud Enviada</h4>
              <p>Capital de Trabajo - S/. 50,000</p>
              <small>Hace 5 días</small>
            </div>
          </div>
        </div>
      </mat-card>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <h2>Acciones Rápidas</h2>
        <div class="actions-grid">
          <button mat-raised-button color="primary" routerLink="/financiamiento/simulador">
            <mat-icon>calculate</mat-icon>
            Simular Préstamo
          </button>
          <button mat-raised-button color="accent" routerLink="/empresas">
            <mat-icon>business</mat-icon>
            Ver Mi Empresa
          </button>
          <button mat-raised-button color="warn" routerLink="/contacto">
            <mat-icon>support_agent</mat-icon>
            Contactar Asesor
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .dashboard-header {
      margin-bottom: 2rem;
    }

    .dashboard-header h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: #333;
    }

    .welcome-text {
      color: #666;
      font-size: 1.1rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      padding: 1.5rem;
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }

    .stat-content {
      flex: 1;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      margin: 0.5rem 0;
      color: #1e88e5;
    }

    .stat-subtitle {
      color: #666;
      font-size: 0.9rem;
    }

    .activity-card {
      margin-bottom: 2rem;
      padding: 1.5rem;
    }

    .activity-list {
      margin-top: 1rem;
    }

    .activity-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid #eee;
    }

    .activity-item:last-child {
      border-bottom: none;
    }

    .activity-content h4 {
      margin: 0;
      color: #333;
    }

    .activity-content p {
      margin: 0.25rem 0;
      color: #666;
    }

    .activity-content small {
      color: #999;
    }

    .quick-actions {
      margin-top: 2rem;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .actions-grid button {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 1rem;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .actions-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  userName = 'Juan'; // This would come from a user service in a real app

  constructor() {}

  ngOnInit(): void {}
} 