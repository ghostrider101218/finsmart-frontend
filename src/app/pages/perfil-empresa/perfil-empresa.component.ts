import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-empresa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.scss']
})
export class PerfilEmpresaComponent {
  empresaId: string;

  constructor(private route: ActivatedRoute) {
    this.empresaId = this.route.snapshot.params['id'];
  }
} 