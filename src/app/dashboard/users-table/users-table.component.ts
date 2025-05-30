import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UsersTableService } from './users-table.service';
import { User } from '../../interfaces/User';

@Component({
  standalone: false,
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedRole: string = '';

  constructor(
    private usersService: UsersTableService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Verifica si el componente se está ejecutando en el navegador o en el servidor
    if (isPlatformBrowser(this.platformId)) {
      console.log('UsersTableComponent inicializado en navegador');
      this.fetchUsers();
    } else {
      console.log('UsersTableComponent inicializado en servidor');
    }
  }

  fetchUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.applyFilter();
        console.log('Usuarios cargados:', data);
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      },
    });
  }

  applyFilter(): void {
    this.filteredUsers = this.selectedRole
      ? this.users.filter((user) => user.tipo === this.selectedRole)
      : this.users;
  }

  onRoleChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedRole = selectElement.value;
    this.applyFilter();
  }

  refresh(): void {
    this.fetchUsers();
  }
}
