import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-category-chips',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule
  ],
  templateUrl: './category-chips.component.html',
  styleUrls: ['./category-chips.component.scss']
})
export class CategoryChipsComponent {
  @Input() categorias: string[] = [];
  @Input() categoriaSeleccionada = '';
  @Output() categoriaChange = new EventEmitter<string>();

  seleccionarCategoria(categoria: string) {
    this.categoriaChange.emit(categoria);
  }
} 