import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BarberoInterface } from 'src/app/core/interfaces/barbero-interface';
import { BarberoService } from 'src/app/core/services/barbero.service';
import { ToastService } from 'src/app/services/toast.service';
import { AddEditBarberosComponent } from '../add-edit-barberos/add-edit-barberos.component';
import { InfoBarberosComponent } from '../info-barberos/info-barberos.component';
import { DeleteBarberosComponent } from '../delete-barberos/delete-barberos.component';

@Component({
  selector: 'app-table-barberos',
  templateUrl: './table-barberos.component.html',
  styleUrls: ['./table-barberos.component.css']
})
export class TableBarberosComponent {

  displayedColumns: string[] = ['nombres', 'telefono', 'especialidad', 'experiencia', 'acciones'];
  dataSource = new MatTableDataSource<BarberoInterface>();

  constructor(
    private _barberosService: BarberoService,
    public dialog: MatDialog,
    private _alert: ToastService
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = "Items por Página ";
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.getBarberos();
  }

  getBarberos() {
    this.dataSource.data = this._barberosService.get()
  }

  openAdd() {
    this.dialog.open(AddEditBarberosComponent, {
      autoFocus: false,
      disableClose: true,
      width: '20rem',
    }).afterClosed().subscribe(
      (result: string) => {
        this.handleDialogClose(result);
      });
  }

  openEdit(barbero: BarberoInterface) {
    this.dialog.open(AddEditBarberosComponent, {
      autoFocus: false,
      disableClose: true,
      width: '20rem',
      data: barbero
    }).afterClosed().subscribe(
      (result: string) => {
        this.handleDialogClose(result);
      });
  }

  openInfo(barbero: BarberoInterface) {
    this.dialog.open(InfoBarberosComponent, {
      autoFocus: false,
      width: 'auto',
      data: barbero
    })
  }

  openDelete(barbero: BarberoInterface) {
    this.dialog.open(DeleteBarberosComponent, {
      autoFocus: false,
      width: 'auto',
      data: barbero
    }).afterClosed().subscribe(
      (result: string) => {
        this.handleDialogClose(result);
      });
  }

  private handleDialogClose(messageType: string): void {
    if (messageType === 'success') {
      this.getBarberos()
      this._alert.success("Operación completada con éxito");
    } else if (messageType === 'error') {
      this._alert.error("Error en la operación");
    }
  }

}
