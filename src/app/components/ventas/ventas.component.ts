import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Ventas } from '../interface/Ventas';
import { Opciones } from '../interface/Opciones';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements AfterViewInit{

  form: FormGroup;
  listaVentas: Ventas[] = [];

  listaProductos: Opciones[] = [
    { id: 1, valor: 'Maquina de afeitar' },
    { id: 2, valor: 'Ceras para peinar' },
    { id: 3, valor: 'Navajas y maquinillas de afeitar' },
    { id: 4, valor: 'Secadores de cabello' },
    { id: 5, valor: 'Toallas y paños' },
    { id: 6, valor: 'Limpiadores faciales' },
    { id: 7, valor: 'Champús y acondicionadores' },
    { id: 8, valor: 'Tijeras y recortadoras de barba' },
  ];

  listaPago: Opciones[] = [
    { id: 1, valor: 'Paypal' },
    { id: 2, valor: 'Visa' },
  ];

  displayedColumns: string[] = ['nombreCliente','nombreProducto','cantidad','metodoPago','fechaRegistro', 'acciones'];
  dataSource = new MatTableDataSource<Ventas>();
  #loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;

    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por pag';
    }
  }

      agregarVenta(): void {
        const ventas: Ventas = {
          nombreCliente: this.form.value.nombreCliente,
          nombreProducto: this.form.value.nombreProducto,
          cantidad: this.form.value.cantidad,
          metodoPago: this.form.value.metodoPago,
          fechaRegistro: this.form.value.fechaRegistro
        }

            this.listaVentas.push(ventas);
            this.dataSource.data = this.listaVentas; 

            this.mensajeExito('registrado');

        // Limpiar los controles después de registrar los datos
            this.form.reset();
      }


  mensajeExito(texto: string) {
    this._snackBar.open(`El Alumno fue ${texto} con exito`, 'Sistema', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  mensajeError(texto: string) {
    this._snackBar.open(`Error: ${texto}`, 'Sistema', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
  
  eliminarVentas(nombreCliente: string): void {
    const indice = this.listaVentas.findIndex(element => element.nombreCliente == nombreCliente)
    console.log(indice);
    this.listaVentas.splice(indice, 1);
    this.dataSource.data = this.listaVentas;
  }

  mostrar(element: Ventas): void {
    console.log(element.nombreCliente);
    console.log(JSON.stringify(element));
    this.router.navigate(['mostrar',JSON.stringify(element)]);
  }

  cancelar(): void {
    this.form.reset();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


    constructor(private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar, 
    private aRoute: ActivatedRoute){
      this.form = this.fb.group({
        nombreCliente: ['', Validators.required],
        nombreProducto: ['', Validators.required],
        cantidad: ['', Validators.required],
        metodoPago: ['', Validators.required],
        fechaRegistro: ['', Validators.required]
  
      })
    }

}
