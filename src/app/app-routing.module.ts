import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { LoginComponent } from './components/login/login.component';
import { CrearUsuarioComponent } from './components/login/crear-usuario/crear-usuario.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { MenuComponent } from './components/menu/menu.component';
import { CitasComponent } from './components/citas/citas.component';
import { AuthenticationComponent } from './admins/page/authentication/authentication.component';
import { NavigatorComponent } from './admins/page/navigator/navigator.component';
import { TableBarberosComponent } from './admins/components/barberos/table-barberos/table-barberos.component';
import { BarberosPageComponent } from './components/barberos-page/barberos-page.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [

  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  {
    path: 'login', component: LoginComponent,
    children: [
      { path: 'crear-usuario', component: CrearUsuarioComponent },
    ]
  },
  { path: 'cliente', component: ClienteComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'citas', component: CitasComponent },
  { path: 'login-admins', component: AuthenticationComponent },
  { path: 'barberos', component: BarberosPageComponent },
  {
    path: 'dashboard',
    component: NavigatorComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'custom-barberos', pathMatch: 'full' },
      { path: 'custom-barberos', component: TableBarberosComponent }
    ]
  },
  { path: '**', redirectTo: 'menu', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
