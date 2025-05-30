import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, } from '@angular/core';
import { User } from '../../interfaces/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersTableService } from '../users-table/users-table.service';

@Component({
  standalone: false,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnChanges {
  @Input() mensajeBtn: string = '';
  @Input() modalTitle: string = '';
  @Input() modalId: string = '';
  @Input() user?: User;
  @Output() formSubmitted = new EventEmitter<void>();
  form: FormGroup;
  loading = false;
  submitted = false;
  errorMessage: string | null = null;

  //crea un grupo del formulario, establece validaciones y prepara el enrutamiento
  constructor(
    private formBuilder: FormBuilder,
    private authService: UsersTableService
  ) {
    this.form = this.formBuilder.group({
      clave: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ],
      ],
      tipo: ['', [Validators.required, Validators.pattern('^(admin|user)$')]],
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(12),
        ],
      ],
      apellidoPaterno: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      apellidoMaterno: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  //acceso rápido a los controles del formulario
  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    console.log('Formulario enviado');

    this.submitted = true;

    if (this.form.invalid) return;

    const userData: User = this.form.value;

    this.loading = true;

    // si hay un usuario, se actualiza; si no, se crea uno nuevo
    if (this.user) {
      this.authService.updateUser(this.user.id, userData).subscribe({
        next: () => {
          this.formSubmitted.emit();
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = 'Error al actualizar usuario';
          console.error(err);
          this.loading = false;
        },
      });
    } else {
      this.authService.addUser(userData).subscribe({
        next: () => {
          this.formSubmitted.emit();
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = 'Error al crear usuario';
          console.error(err);
          this.loading = false;
        },
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.initializeFormWithUserData();
    }
  }

  private initializeFormWithUserData(): void {
    this.form.patchValue({
      clave: this.user?.clave || '',
      tipo: this.user?.tipo || '',
      nombre: this.user?.nombre || '',
      username: this.user?.username || '',
      apellidoPaterno: this.user?.apellidoPaterno || '',
      apellidoMaterno: this.user?.apellidoMaterno || '',
      password: this.user?.password || '',
    });
  }
}
