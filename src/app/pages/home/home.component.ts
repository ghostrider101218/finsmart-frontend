import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <h1>Impulsa tu negocio al siguiente nivel</h1>
          <p class="hero-subtitle">Financiamiento inteligente para empresas modernas</p>
          <div class="hero-actions">
            <button mat-raised-button color="primary" routerLink="/financiamiento/simulador">
              Simular Préstamo
            </button>
            <button mat-stroked-button color="primary" routerLink="/contacto">
              Hablar con un asesor
            </button>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <h2>¿Por qué elegirnos?</h2>
        <div class="features-grid">
          <mat-card>
            <mat-icon>speed</mat-icon>
            <h3>Aprobación Rápida</h3>
            <p>Evaluación y respuesta en menos de 24 horas</p>
          </mat-card>
          <mat-card>
            <mat-icon>trending_up</mat-icon>
            <h3>Tasas Competitivas</h3>
            <p>Las mejores tasas del mercado para tu negocio</p>
          </mat-card>
          <mat-card>
            <mat-icon>security</mat-icon>
            <h3>100% Digital</h3>
            <p>Proceso completamente en línea y seguro</p>
          </mat-card>
        </div>
      </section>

      <!-- Products Section -->
      <section class="products-section">
        <h2>Nuestras Soluciones Financieras</h2>
        <div class="products-grid">
          <mat-card class="product-card">
            <h3>Capital de Trabajo</h3>
            <p>Financia las operaciones diarias de tu empresa</p>
            <button mat-button color="primary" routerLink="/financiamiento">
              Conoce más <mat-icon>arrow_forward</mat-icon>
            </button>
          </mat-card>
          <mat-card class="product-card">
            <h3>Expansión de Negocio</h3>
            <p>Impulsa el crecimiento de tu empresa</p>
            <button mat-button color="primary" routerLink="/financiamiento">
              Conoce más <mat-icon>arrow_forward</mat-icon>
            </button>
          </mat-card>
          <mat-card class="product-card">
            <h3>Activos Fijos</h3>
            <p>Adquiere equipamiento y mejora tu infraestructura</p>
            <button mat-button color="primary" routerLink="/financiamiento">
              Conoce más <mat-icon>arrow_forward</mat-icon>
            </button>
          </mat-card>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <h2>¿Listo para crecer?</h2>
        <p>Únete a miles de empresas que ya confían en nosotros</p>
        <button mat-raised-button color="primary" routerLink="/register">
          Comienza Ahora
        </button>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      width: 100%;
      max-width: 100%;
      overflow-x: hidden;
    }

    .hero-section {
      background: linear-gradient(135deg, #1e88e5 0%, #1565c0 100%);
      color: white;
      padding: 6rem 2rem;
      text-align: center;
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .hero-content h1 {
      font-size: 3.5rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .hero-subtitle {
      font-size: 1.5rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .features-section,
    .products-section {
      padding: 4rem 2rem;
      text-align: center;
    }

    .features-grid,
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
      padding: 0 1rem;
    }

    mat-card {
      padding: 2rem;
      text-align: center;
      transition: transform 0.3s ease;
    }

    mat-card:hover {
      transform: translateY(-5px);
    }

    mat-icon {
      font-size: 2.5rem;
      height: 2.5rem;
      width: 2.5rem;
      margin-bottom: 1rem;
      color: #1e88e5;
    }

    .cta-section {
      background: #f5f5f5;
      padding: 4rem 2rem;
      text-align: center;
      margin-top: 2rem;
    }

    h2 {
      font-size: 2.5rem;
      margin-bottom: 2rem;
      color: #333;
    }

    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #333;
    }

    .product-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      min-height: 200px;
    }

    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.2rem;
      }

      .features-grid,
      .products-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
