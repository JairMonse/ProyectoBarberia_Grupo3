import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.form.valid) {
      // Aquí deberías agregar la lógica para autenticar al usuario
      // Puedes enviar los datos al servicio de autenticación
      console.log('Usuario:', this.form.value.username);
      console.log('Contraseña:', this.form.value.password);
      // También podrías navegar a la página principal si la autenticación es exitosa
    }
  }
  
}
