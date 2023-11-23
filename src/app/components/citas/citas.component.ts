import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from '../interface/Cliente';
import { Citas } from '../interface/Citas';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent {

  form: FormGroup;
  listaCitas: Citas[] = [];

  displayedColumns: string[] = ['fechaCita','hora','tipoServicio','nombreBarbero','telefono','correoE', 'acciones'];
  dataSource = new MatTableDataSource<Citas>();
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

    agregarCita(): void {
        const cita: Citas = {

          fechaCita: this.form.value.fechaCita,
          hora: this.form.value.hora,
          tipoServicio: this.form.value.tipoServicio,
          nombreBarbero: this.form.value.nombreBarbero,
          nombres: this.form.value.nombres,
          telefono: this.form.value.telefono,
          correoE: this.form.value.correoE,
        }

            this.listaCitas.push(cita);
            this.dataSource.data = this.listaCitas;

            this.mensajeExito('registrado');

        // Limpiar los controles después de registrar los datos
            this.form.reset();
      }
  

  mensajeExito(texto: string) {
    this._snackBar.open(`La cita fue ${texto} con exito`, 'Sistema', {
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
  
  eliminarCita(nombres: string): void {
    const indice = this.listaCitas.findIndex(element => element.nombres == nombres)
    console.log(indice);
    this.listaCitas.splice(indice, 1);
    this.dataSource.data = this.listaCitas;
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



