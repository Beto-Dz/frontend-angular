import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class LoginComponent {
  //componente de inicio de sesión
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage: string | null = null;

  //crea un grupo del formulario, establece validaciones y prepara el enrutamiento
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(12),],],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  //acceso rápido a los controles del formulario
  get f() {
    console.log(this.loginForm.controls);
    return this.loginForm.controls;
  }

  // metodo para manejar el envio del form
  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    // uso del servicio de autenticación para iniciar sesión
    this.authService
      .login(this.f['username'].value, this.f['password'].value)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'Error en autenticación';
        },
      });
  }
}
