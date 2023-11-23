import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from '../interface/Producto';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  form: FormGroup;
  listaProducto: Producto[] = [];

  displayedColumns: string[] = ['nombreProducto','cantidadInventario','precio','descripcion', 'acciones'];
  dataSource = new MatTableDataSource<Producto>();
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

      agregarProducto(): void {
        const producto: Producto = {
          nombreProducto: this.form.value.nombreProducto,
          cantidadInventario: this.form.value.cantidadInventario,
          precio: this.form.value.precio,
          descripcion: this.form.value.descripcion
        }

            this.listaProducto.push(producto);
            this.dataSource.data = this.listaProducto;

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
  
  eliminarProducto(nombreProducto: string): void {
    const indice = this.listaProducto.findIndex(element => element.nombreProducto == nombreProducto)
    console.log(indice);
    this.listaProducto.splice(indice, 1);
    this.dataSource.data = this.listaProducto;
  }

  mostrar(element: Producto): void {
    console.log(element.nombreProducto);
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
        nombreProducto: ['', Validators.required],
        cantidadInventario: ['', Validators.required],
        precio: [ '',
        Validators.required,
        Validators.pattern(/^(\d{1,2}(\.\d{1,2})?)$/)
      ],
        descripcion: ['', Validators.required]
  
      })
    }
  }


