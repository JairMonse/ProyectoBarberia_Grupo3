import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from '../interface/Cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  form: FormGroup;
  listaCliente: Cliente[] = [];

  displayedColumns: string[] = ['cedula','apellido','nombre','correoE', 'acciones'];
  dataSource = new MatTableDataSource<Cliente>();
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

    agregarCliente(): void {
      
      const nuevaCedula = this.form.value.cedula;
    
      if (this.listaCliente.some(cliente => cliente.cedula === nuevaCedula)) {

        this.mensajeError('La cédula ya existe');
      } else {
        const cliente: Cliente = {
          cedula: this.form.value.cedula,
          apellido: this.form.value.apellido,
          nombre: this.form.value.nombre,
          correoE: this.form.value.correoE,
        }

            this.listaCliente.push(cliente);
            this.dataSource.data = this.listaCliente;

            this.mensajeExito('registrado');

        // Limpiar los controles después de registrar los datos
            this.form.reset();
      }
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
  
  eliminarCliente(cedula: string): void {
    const indice = this.listaCliente.findIndex(element => element.cedula == cedula)
    console.log(indice);
    this.listaCliente.splice(indice, 1);
    this.dataSource.data = this.listaCliente;
  }

  mostrar(element: Cliente): void {
    console.log(element.nombre);
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
        cedula: ['',
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.minLength(10),
            Validators.pattern(/^([0-9])*$/)
          ]
        ],
        apellido: ['', Validators.required],
        nombre: ['', Validators.required],
        correoE: ['', Validators.required]
  
      })

  }

}
