import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

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
  selector: 'app-article-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() articulo!: BlogPost;
} 