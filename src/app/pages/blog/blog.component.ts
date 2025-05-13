import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';
import { FeaturedArticleComponent } from '../../components/featured-article/featured-article.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { CategoryChipsComponent } from '../../components/category-chips/category-chips.component';

interface BlogPost {
  id: string;
  titulo: string;
  resumen: string;
  imagen: string;
  autor: string;
  fecha: Date;
  categoria: string;
  tiempoLectura: number;
  tags: string[];
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    ArticleCardComponent,
    FeaturedArticleComponent,
    SearchBarComponent,
    CategoryChipsComponent
  ],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  categorias = ['Todos', 'Finanzas', 'Gestión', 'Tecnología', 'Emprendimiento', 'Legal'];
  categoriaSeleccionada = 'Todos';
  pagina = 1;
  totalPaginas = 5;

  destacado: BlogPost = {
    id: 'post-1',
    titulo: '10 Estrategias de Crecimiento para PyMEs en 2024',
    resumen: 'Descubre las mejores prácticas y estrategias que están implementando las empresas exitosas para crecer en el actual contexto económico.',
    imagen: 'assets/blog/estrategias-crecimiento.jpg',
    autor: 'María González',
    fecha: new Date('2024-03-01'),
    categoria: 'Estrategia',
    tiempoLectura: 8,
    tags: ['crecimiento', 'estrategia', 'pymes']
  };

  posts: BlogPost[] = [
    {
      id: 'post-2',
      titulo: 'Guía Completa de Financiamiento para Startups',
      resumen: 'Todo lo que necesitas saber sobre las diferentes opciones de financiamiento disponibles para empresas emergentes.',
      imagen: 'assets/blog/financiamiento-startups.jpg',
      autor: 'Carlos Ruiz',
      fecha: new Date('2024-02-28'),
      categoria: 'Finanzas',
      tiempoLectura: 12,
      tags: ['startups', 'financiamiento', 'inversión']
    },
    {
      id: 'post-3',
      titulo: 'Transformación Digital: Por Dónde Empezar',
      resumen: 'Una hoja de ruta práctica para iniciar la transformación digital de tu negocio de manera efectiva.',
      imagen: 'assets/blog/transformacion-digital.jpg',
      autor: 'Ana Martínez',
      fecha: new Date('2024-02-25'),
      categoria: 'Tecnología',
      tiempoLectura: 10,
      tags: ['digital', 'tecnología', 'innovación']
    },
    {
      id: 'post-4',
      titulo: 'Claves para una Gestión Financiera Exitosa',
      resumen: 'Aprende a manejar las finanzas de tu empresa de manera eficiente y sostenible.',
      imagen: 'assets/blog/gestion-financiera.jpg',
      autor: 'Pedro López',
      fecha: new Date('2024-02-20'),
      categoria: 'Finanzas',
      tiempoLectura: 15,
      tags: ['finanzas', 'gestión', 'planificación']
    }
  ];

  filtrarPorCategoria(categoria: string) {
    this.categoriaSeleccionada = categoria;
    // Implementar lógica de filtrado
  }
} 