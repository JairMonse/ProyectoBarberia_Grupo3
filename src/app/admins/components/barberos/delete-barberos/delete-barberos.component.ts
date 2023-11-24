import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BarberoInterface } from 'src/app/core/interfaces/barbero-interface';
import { BarberoService } from 'src/app/core/services/barbero.service';

@Component({
  selector: 'app-delete-barberos',
  templateUrl: './delete-barberos.component.html',
  styleUrls: ['./delete-barberos.component.css']
})
export class DeleteBarberosComponent {

  constructor(
    private _barberosServicio: BarberoService,
    private dialogRef: MatDialogRef<DeleteBarberosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BarberoInterface) { }

  eliminar() {
    if(this.data.id){
      const respuesta = this._barberosServicio.delete(this.data.id)
      const messageType = respuesta ? 'success' : 'error';
      this.dialogRef.close(messageType);
    }
  }

}
