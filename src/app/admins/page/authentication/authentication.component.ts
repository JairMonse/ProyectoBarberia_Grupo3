import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { UsuarioInterface } from '../../interfaces/usuario-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _alert: ToastService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  handleSubmit() {
    if (this.form.invalid) {
      this._alert.error("Todos los campos son requeridos.")
      return
    }

    const credentials: UsuarioInterface = {
      username: this.form.value.username,
      password: this.form.value.password
    };

    this.router.navigate(['/dashboard'])
  }

}
