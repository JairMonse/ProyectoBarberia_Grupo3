import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BarberoInterface } from 'src/app/core/interfaces/barbero-interface';
import { BarberoService } from 'src/app/core/services/barbero.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-edit-barberos',
  templateUrl: './add-edit-barberos.component.html',
  styleUrls: ['./add-edit-barberos.component.css']
})
export class AddEditBarberosComponent implements OnInit {

  form: FormGroup
  fileName!: any;
  title: string = "Agregar barbero";
  iconName: string = "send";

  constructor(
    private _barberosServicio: BarberoService,
    private _toast: ToastService,
    private dialogRef: MatDialogRef<AddEditBarberosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BarberoInterface,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      nombres: ['', Validators.required],
      especialidad: ['', Validators.required],
      experiencia: ['', Validators.required],
      telefono: ['', Validators.required],
      imageName: ['', Validators.required]
    })
  }

  ngOnInit() {
    if (this.data) {
      this.title = "Editar Producto"
      this.iconName = "edit"
      this.fileName = this.data.imageName
      this.form.patchValue({
        nombres: this.data.nombres,
        especialidad: this.data.especialidad,
        experiencia: this.data.experiencia,
        telefono: this.data.telefono
      })
    }
  }


  onFileSelected(event: Event) {
    this.fileName = (event.target as HTMLInputElement).files?.[0]
  }

  submit() {
    if (this.form.invalid) {
      this._toast.error("Todos los campos son requeridos");
      return;
    }

    const product: BarberoInterface = {
      nombres: this.form.value.nombres,
      especialidad: this.form.value.especialidad,
      experiencia: this.form.value.experiencia,
      telefono: this.form.value.telefono,
      imageName: this.fileName,
    };

    if(this.data){
      product.id = this.data.id
    }

    const updateOrCreate = this.data
      ? this._barberosServicio.put(product)
      : this._barberosServicio.post(product);

    const messageType = updateOrCreate ? 'success' : 'error';
    this.dialogRef.close(messageType);
  }

}
