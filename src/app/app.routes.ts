import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { SolicitudesListComponent } from './pages/solicitudes-list/solicitudes-list.component';
import { DemoServicesComponent } from './pages/demo-services/demo-services.component';
import { EmpresasListComponent } from './pages/empresas-list/empresas-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { SimuladorComponent } from './pages/simulador/simulador.component';
import { PerfilEmpresaComponent } from './pages/perfil-empresa/perfil-empresa.component';
import { EvaluacionDetalleComponent } from './pages/evaluacion-detalle/evaluacion-detalle.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { BlogComponent } from './pages/blog/blog.component';
import { FaqComponent } from './pages/faq/faq.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { 
        path: 'dashboard',
        component: DashboardComponent,
        // Protect this route later with auth guard
      },
      {
        path: 'financiamiento',
        children: [
          { path: '', component: ProductosComponent },
          { path: 'simulador', component: SimuladorComponent },
          { path: 'solicitar', component: SolicitudesListComponent },
        ]
      },
      {
        path: 'empresas',
        children: [
          { path: '', component: EmpresasListComponent },
          { path: ':id', component: PerfilEmpresaComponent },
          { path: ':id/evaluacion/:evalId', component: EvaluacionDetalleComponent }
        ]
      },
      { path: 'blog', component: BlogComponent },
      { path: 'contacto', component: ContactoComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'demo-services', component: DemoServicesComponent },
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];
