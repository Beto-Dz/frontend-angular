import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersTableService } from '../users-table/users-table.service';

@Component({
  standalone: false,
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.css',
})
export class ModalDeleteComponent {
  @Input() modalId: string = '';
  @Input() userId: number = 0;
  @Output() onDeleted = new EventEmitter<void>();

  constructor(private usersTableService: UsersTableService) {}

  eliminarUsuario() {
    this.usersTableService.deleteUser(this.userId).subscribe({
      next: () => {
        this.onDeleted.emit();
      },
      error: (error) => {
        console.error('Error al eliminar el usuario:', error);
      },
    });
  }
}
