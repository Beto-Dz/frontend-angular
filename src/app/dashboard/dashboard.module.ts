import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalComponent } from './modal/modal.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UsersTableComponent } from './users-table/users-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';

@NgModule({
  declarations: [
    UsersComponent,
    NavbarComponent,
    ModalComponent,
    UsersTableComponent,
    ModalDeleteComponent
  ],
  imports: [ CommonModule, DashboardRoutingModule, ReactiveFormsModule ],
  exports: [ // 👈 Añade esta sección
    NavbarComponent,
    ModalComponent,
    UsersTableComponent,
    ModalDeleteComponent
  ]
})
export class DashboardModule {}