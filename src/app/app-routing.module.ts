import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { RegistrarClienteComponent } from './components/cliente/registrar-cliente/registrar-cliente.component';
import { LoginComponent } from './components/login/login.component';
import { CrearUsuarioComponent } from './components/login/crear-usuario/crear-usuario.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { MenuComponent } from './components/menu/menu.component';
import { CitasComponent } from './components/citas/citas.component';

const routes: Routes = [

  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent},
  { path: 'login', component: LoginComponent,
  children:[
    {path:'crear-usuario',component:CrearUsuarioComponent},
  ]},
  { path: 'cliente', component: ClienteComponent,
  children:[
    {path:'registrar-cliente',component:RegistrarClienteComponent},
  ]},
  { path: 'inventario', component: InventarioComponent},
  { path: 'ventas', component: VentasComponent},
  { path: 'citas', component: CitasComponent},
  { path: '**', redirectTo: 'menu', pathMatch: 'full' }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }